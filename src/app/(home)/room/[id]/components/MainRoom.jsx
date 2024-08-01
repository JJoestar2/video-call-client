import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";

import { Streams, SharedScreenStream } from '../../../../../components/Streams';

import Options from '../../../../../components/Options';
import Modal from '../../../../../components/Modal';
import Chat from '../../../../../components/Chat';
import Status from '../../../../../components/Status';

import { useMediaStream, usePeer, useScreen } from "../../../../../hooks";

import { SocketContext, UserConnectionProvider } from "../../../../../contexts";
import UsersSettingsProvider from "../../../../../contexts/UserSettingsContext";

const MainRoom = ({ stream, roomId }) => {
    const router = useRouter();
    const { socket, isConnected } = useContext(SocketContext);
    const { data: session } = useSession();
  
    const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);
    const { peer, myId, isPeerReady } = usePeer(roomId, stream);
    const { screenTrack, startShare, stopShare } = useScreen(stream);

    const [modal, setModal] = useState('hidden');
    const [fullscreen, setFullscreen] = useState(false);

    const replaceTrack = (track) => {
        return (peer) => {
            const sender = peer.peerConnection
            ?.getSenders()
            .find((s) => s.track?.kind === track.kind);

            return sender?.replaceTrack(track);
        };
    }

    useEffect(() => {
        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        socket.on('host:muted-user', (id) => {
            if (myId === id) {
                toggleKind('audio');
                console.log('you are muted by host');
            } else {
                console.log('user muted by host');
            }
        })
    }, [myId]);

    if(!isConnected) return <div className="grid place-items-center h-screen text-white">Setting socket up...</div>

    if (!isPeerReady) return <div className="grid place-items-center h-screen text-white">Setting you up...</div>;
    if (!peer) return <div className="grid place-items-center h-screen text-white">Couldn't create stream for you. Try again later</div>;

    const toggleKind = async (kind, users) => {
        switch (kind) {
            case 'audio': {
                toggle('audio')(stream);
                socket.emit('user-toggle-audio', { room: roomId, id: myId });
                return;
            }
            case 'video': {
                toggleVideo((newVideoTrack) =>
                    users?.forEach(replaceTrack(newVideoTrack))
                );
                socket.emit('user-toggle-video',  { room: roomId, id: myId });
                return;
            }
            case 'screen': {
                if (screenTrack) {
                    stopShare(screenTrack);
                    socket.emit('user:stop-share-screen');
                    setFullscreen(false);
                } else {
                    await startShare(
                        () => {
                            socket.emit('user:share-screen', session.user.name);
                            console.log('start presenting');
                        },
                        () => socket.emit('user:stop-share-screen')
                    );
                }
                return;
            }
            case 'fullscreen': {
                setFullscreen(!fullscreen);
                return;
            }
            case 'chat': {
                modal == 'chat' ? setModal('close') : setModal('chat');
                return;
              }
              case 'users': {
                modal == 'status' ? setModal('close') : setModal('status');
                return;
              }
            default:
                break;
        }
    }

    return (
        <div className="flex">
            <UsersSettingsProvider>
                <div className="sm:flex hidden flex-col p-4 w-full h-screen">
                    <UserConnectionProvider stream={stream} myId={myId} peer={peer} roomId={roomId}>
                        <div className="flex h-full place-items-center place-content-center gap-4">
                            <SharedScreenStream
                                sharedScreen={screenTrack}
                                fullscreen={fullscreen}
                            />

                            <Streams
                                stream={stream}
                                fullscreen={fullscreen}
                                sharedScreen={screenTrack}
                                muted={muted}
                                visible={visible}
                            />
                        </div>
                        <div className="flex items-center">
                            <Options
                                muted={muted}
                                visible={visible}
                                onToggle={toggleKind}
                                chat={modal == 'chat'}
                                screenTrack={Boolean(screenTrack)}
                                onLeave={() => router.push('/')}
                            />
                        </div>
                    </UserConnectionProvider>
                </div>

                <Modal
                    title={
                        modal === 'chat'
                        ? 'Meeting Chat'
                        : modal === 'status'
                        ? 'People'
                        : ''
                    }
                    modal={modal}
                    onClose={() => setModal('close')}
                >
                    <div className={modal !== 'chat' ? 'hidden' : ''}>
                        <Chat />
                    </div>
                    <div className={modal !== 'status' ? 'hidden' : ''}>
                        <Status muted={muted} visible={visible} />
                    </div>
                </Modal>
            </UsersSettingsProvider>
        </div>
    )
}

export default MainRoom;
