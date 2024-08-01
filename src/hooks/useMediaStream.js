'use client';

import { useState, useEffect } from 'react';

const useMediaStream = (stream = null) => {
    const [state, setState] = useState(stream);
    const [status, setStatus] = useState('loading');

    const [music, setMusic] = useState(false);
    const [video, setVideo] = useState(true);

    useEffect(() => {
        if (stream) {
            setStatus('idle');

            const [audio, video] = stream.getTracks();

            setMusic(!audio.enabled);
            setVideo(video?.enabled);
        } else {
            (async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    });

                    setState(stream);
                    setStatus('success');
                } catch (error) {
                    setStatus('rejected');
                    console.log(`Cannot get user stream data: ${error}`)
                }
            })()
        }
    }, []);

    const toggle = (kind) => {
        return (s = state) => {
            if (!s) throw new Error("Failed. Could not find stream");
      
            const track = s.getTracks().find((track) => track.kind == kind);
      
            if (!track)
              throw new Error(`Failed. Could not find ${kind} track in given stream`);
      
            if (track.enabled) {
              track.enabled = false;
              track.kind == "audio" ? setMusic(true) : setVideo(false);
            } else {
              track.enabled = true;
              track.kind == "audio" ? setMusic(false) : setVideo(true);
            }
        };
    }

    const toggleVideo = async (cb) => {
        if (!state) throw new Error("Failed. Could not find stream");

        const videoTrack = state.getVideoTracks()[0];

        if (videoTrack.readyState === 'live') {
            videoTrack.enabled = false;
            videoTrack.stop(); // turn off video web cam indicator
            setVideo(false);
        } else {
            const newStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            const newVideoTrack = newStream.getVideoTracks()[0];

            if (typeof cb === 'function') cb(newVideoTrack);
            
            state.removeTrack(videoTrack);

            const [screenTrack] = state.getVideoTracks();

            if (screenTrack) {
                state.removeTrack(screenTrack);
                state.addTrack(newVideoTrack);
                state.addTrack(screenTrack);
            } else state.addTrack(newVideoTrack);

            setState(state);
            setVideo(true);
        }
    }

    return {
        stream: state,
        muted: music,
        visible: video,
        toggle,
        toggleAudio: toggle('audio'),
        toggleVideo,
        isSuccess: status == "success" || status == "idle",
        isLoading: status == "loading",
        isRejected: status === 'rejected',
    }
}

export default useMediaStream;