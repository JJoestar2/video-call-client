'use client';

import { useSession } from "next-auth/react";

import VideoContainer from "../VideoContainer"
import VideoPlayer from "../VideoPlayer"

const MyStream = ({
    stream,
    visible,
    muted,
    id,
}) => {
    const { data: session } = useSession();
    const avatar = session?.user?.image || '';

    return (
        <VideoContainer
            id={id}
            stream={stream}
            visible={visible}
            muted={muted}
            picture={avatar}
        >
            <VideoPlayer stream={stream} name={'You'} isMe={true} />
        </VideoContainer>
    );
};

export default MyStream;
