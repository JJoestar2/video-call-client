'use client';

import { useContext } from "react";

import { UserConnectionContext, UsersStateContext, UsersUpdaterContext } from "../../contexts";
import VideoContainer from "../VideoContainer/VideoContainer";

const OtherStreams = () => {
    const { streams, isMuted, isHidden, avatars } = useContext(UsersStateContext);
    const { muteUser } = useContext(UsersUpdaterContext);
    const { leaveRoom } = useContext(UserConnectionContext);

    console.log(streams);

    return (
        <>
            {Object.entries(streams).map(([id, element]) => (
                <VideoContainer
                    key={id}
                    muted={isMuted[id]}
                    visible={!isHidden[id]}
                    picture={avatars[id]}
                    stream={element?.stream}
                    onMutePeer={muteUser}
                    onRemovePeer={leaveRoom}
                >
                    {element?.player}
                </VideoContainer>
            ))}
        </>
    );
}

export default OtherStreams;
