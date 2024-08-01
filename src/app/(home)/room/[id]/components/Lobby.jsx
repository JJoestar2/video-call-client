'use client';

import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { Mic, Videocam } from '@mui/icons-material';

import CrossLineDiv from '../../../../../components/CrossLineDiv';

import VideoPlayer from "../../../../../components/VideoPlayer";
import VideoContainer from "../../../../../components/VideoContainer";

import { useMediaStream } from "../../../../../hooks";

const Lobby = ({ stream, setIsLobby }) => {
    const { data: session } = useSession();
    const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);

    return (
        <div className="h-screen w-auto grid grid-cols-2 gap-4 place-content-center place-items-center">
            <div className="flex flex-col gap-2">
                <VideoContainer
                    id="me"
                    muted={muted}
                    visible={visible}
                    stream={stream}
                    picture={session?.user.image || ''}
                    >
                    <VideoPlayer key="me" stream={stream} name={'You'} isMe={true} />
                </VideoContainer>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toggleVideo()}
                        data-for="visibility"
                        data-tip={`${!visible ? 'switch on' : 'switch off'}`}
                        className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
                    >
                        <Videocam className="h-6 w-6" />
                        {!visible && <CrossLineDiv />}
                    </button>
                    <button
                        onClick={() => toggle('audio')(stream)}
                        data-for="audio"
                        data-tip={`${muted ? 'unmute' : 'mute'}`}
                        className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
                    >
                        <Mic className="h-6 w-6" />
                        {muted && <CrossLineDiv />}
                    </button>
                </div>
            </div>
            <Button
                onClick={() => setIsLobby(false)}
                className="p-2 text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200"
                type="button"
            >
                Join
            </Button>
        </div>
    );
}

export default Lobby;