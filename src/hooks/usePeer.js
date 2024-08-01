'use client';

import Peer from 'peerjs';
import { useSession } from "next-auth/react";

import { useState, useEffect } from 'react';
import { useSocketContext } from '../contexts';

import useMediaStream from './useMediaStream';

const usePeer = (room, stream) => {
    const { data: session, status } = useSession();

   const [myId, setMyId] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const [peer, setPeer] = useState(null);

   const { muted, visible } = useMediaStream(stream);

   const { socket } = useSocketContext();


    useEffect(() => {
        const createPeerAndJoin = () => {
            try {
                const peer = new Peer();

                setPeer(peer);
                setIsLoading(false);

                peer.on('open', (id) => {
                    setMyId(id);

                    socket.emit("join:room", {
                        room,
                        user: {
                            id,
                            muted,
                            visible,
                            name: session?.user?.name || "",
                            picture: session?.user?.image || "",
                        }
                    });
                });

                peer.on('error', () => console.log('cannot establish peer'))
            } catch(err) {
                console.log('cannot establish peer', err);
            }
        }

        createPeerAndJoin();
    }, []);

    return {
        myId,
        peer,
        isPeerReady: !isLoading,
    }
};

export default usePeer;