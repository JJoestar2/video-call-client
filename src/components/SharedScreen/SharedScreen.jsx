import { memo } from "react";

const SharedScreen = ({ sharedScreenTrack }) => {
    return (
        <video
            className="rounded-[12px] h-[calc(100vh-5rem)] object-contain"
            ref={(node) => {
                if (node) node.srcObject = new MediaStream([sharedScreenTrack]);
            }}
            muted
            autoPlay
        />
    )
}

export default memo(SharedScreen);