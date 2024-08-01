'use client';

import { useContext } from "react";

import { MicOff } from "@mui/icons-material";

import { UserConnectionContext } from "../../contexts";

import VideoPlug from '../VideoPlug';
import HostOptions from '../HostOptions';
import ActiveSpeaker from '../ActiveSpeaker';

const VideoContainer = ({
    id,
    muted,
    visible,
    children,
    stream,
    picture,
    onMutePeer,
    onRemovePeer,
}) => {
    const { myId } = useContext(UserConnectionContext);

    return (
        <div key={id} className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50">
            {!visible && <VideoPlug picture={picture} />}

            <div className={`${!visible ? 'hidden' : ''}`}>{children}</div>
            
            {muted ? (
                <div className="absolute top-3 right-3">
                    <MicOff />
                </div>
            ) : (
                <ActiveSpeaker stream={stream} />
            )}

            {myId !== id && (
                <HostOptions
                    isMuted={muted}
                    onMutePeer={() => onMutePeer && onMutePeer(id)}
                    onRemovePeer={() => onRemovePeer && onRemovePeer(id)}
                />
            )}
        </div>
    )
}

export default VideoContainer;
