'use client';

import { useState } from "react";

import Lobby from "./components/Lobby";
import MainRoom from "./components/MainRoom";

import { SocketProvider } from '../../../../contexts';

import { useMediaStream } from "../../../../hooks";

const Room = ({ params: { id } }) => {
    const [isLobby, setIsLobby] = useState(true);
    const { stream, isLoading } = useMediaStream();

    if (isLoading) return <div className="grid place-items-center h-screen text-white">Preparing stream</div>;
    if (!stream) return <div className="grid place-items-center h-screen text-white">Couldn't create stream for you. Try again later</div>;

    if (isLobby) return <Lobby stream={stream} setIsLobby={setIsLobby} />;
    
    return (
        <SocketProvider>
            <MainRoom stream={stream} roomId={id} />
        </SocketProvider>
    )
}

export default Room;
