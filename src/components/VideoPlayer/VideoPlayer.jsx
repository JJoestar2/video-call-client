import { memo } from "react";

const VideoPlayer = ({ stream, name, isMe }) => {
    return (
        <div className='w-96'>
            <video
                muted={isMe}
                autoPlay
                className='rounded-[12px] aspect-video object-cover scale-x-100'
                ref={(node) => {
                    if (node) node.srcObject = stream;
                }}
            />
            <p className="font-medium absolute bottom-3 left-4 text-xs">
                <span className="text-white">{name}</span>
            </p>
        </div>
    );
}

export default memo(VideoPlayer);