'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useSession } from "next-auth/react";

import VideoPlayer from '../components/VideoPlayer';

import { useMediaStream } from '../hooks';
import { SocketContext } from './SocketContext';
import { UsersUpdaterContext } from './UserSettingsContext';

import { append } from '../utils';

export const UserConnectionContext = createContext({});

export const UserConnectionProvider = ({ children, stream, peer, myId, roomId }) => {
    const { data: session } = useSession();

    const { socket } = useContext(SocketContext);
    const {
      setIsMuted,
      setIsHidden,
      setAvatars,
      setStreams,
      setNames,
      setSharedScreenTrack,
    } = useContext(UsersUpdaterContext);

    const { muted, visible } = useMediaStream(stream);
    const [users, setUsers] = useState({});

    const removeStream = (id) => {
        setStreams((prevStreams) => {
            const obj = {};

            for (const key in prevStreams) {
                if (key !== id) obj[id] = prevStreams[id];
            }

            return obj;
        });
    };

    const leaveRoom = (id) => {
        socket.emit('user:left', { room: roomId, id });
        users[id]?.close();

        removeStream(id);
    }

    // * user a accepts user b and make a call
    useEffect(() => {
        if (!peer) return;

        const handleUserConnected = ({ id, name, picture, muted: initMuted, visible: initVisible }) => {
            const call = peer.call(
                id,
                stream,
                {
                    metadata: {
                        room: roomId,
                        user: {
                            id,
                            name: session?.user.name,
                            picture: session?.user?.image,
                        },
                        muted,
                        visible,
                    },
                }
            );

            call.on('stream', (stream) => {
                setStreams(
                    append({
                        [id]: {
                            player: <VideoPlayer stream={stream} name={name} isMe={false} />,
                            stream,
                        }
                    })
                );
                // friend stream
                const screenTrack = stream.getVideoTracks()[1];
                screenTrack && setSharedScreenTrack(shared);
            });

            call.on('close', () => console.log(`${id} has left the call`));

            setUsers(append({ [id]: call }));
            setIsMuted(append({ [id]: initMuted }));
            setIsHidden(append({ [id]: !initVisible }));
            setAvatars(append({ [id]: picture }));
            setNames(append({ [id]: name }));
        }

        socket.on('user-connected', handleUserConnected);

        return () => socket.off('user-connected', handleUserConnected);
        
    }, [peer]);

    // * user b answers to user a's call
    useEffect(() => {
        if (!peer) return;

        peer.on('call', (call) => {
            const { peer, metadata } = call;

            const { user: { name, picture }, visible, muted } = metadata;

            setUsers(append({ [peer]: call }));
            setIsMuted(append({ [peer]: muted }));
            setIsHidden(append({ [peer]: !visible }));
            setAvatars(append({ [peer]: picture }));
            setNames(append({ [peer]: name }));

            call.answer(stream);

            call.on('stream', (stream) => {
                setStreams(
                    append({
                        [peer]: {
                            player: <VideoPlayer stream={stream} name={name} isMe={false} />,
                            stream,
                        }
                    })
                );
                /* reciever screen */
                const screenTrack = stream.getVideoTracks()[1];
                screenTrack && setSharedScreenTrack(shared);
            });
    
            call.on('close', () => console.log(`${call.from} has left the call`));
        });
    }, [peer]);


    useEffect(() => {    
        socket.on('user:left', (id) => {
            if (myId == id) window.location.replace('/');
            else {
                removeStream(id);
                users[id]?.close();
            }
        });

        return () => socket.off('user:left');
        
    }, [myId, users]);

    useEffect(() => {
        socket.on('user:shared-screen', (username) => {
            if (peer) {
                peer.disconnect();
                peer.reconnect();
            }
            console.log(`${username} shared screen`);
        })

        return () => socket.off('user:shared-screen');
    }, [peer]);

    useEffect(() => {
        socket.on('user:stopped-screen-share', () => {
            setSharedScreenTrack(null);
            console.log(`stop shared screen`);
        });

        return () =>  socket.off('user:stopped-screen-share');
    }, []);

    return (
        <UserConnectionContext.Provider value={{
            users,
            peer,
            myId,
            leaveRoom,
        }}>
            {children}
        </UserConnectionContext.Provider>
    )
}

export const useUserConnectionContext = () => {
    const context = useContext(UserConnectionContext);
  
    if (!context) {
      throw new Error("useUserConnectionContext must be used within a UserConnectionProvider");
    }
  
    return context;
};
  