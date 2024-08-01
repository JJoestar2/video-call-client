'use client';

import { useState } from 'react';

const useScreen = (stream) => {
    const [status, setStatus] = useState('idle');
    const [screenTrack, setScreenTrack] = useState(null);

    const startShare = async (onstarted, onended) => {
        setStatus('loading');

        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false
            });
            const [screenTrack] = screenStream.getTracks();

            setScreenTrack(screenTrack);
            stream.addTrack(screenTrack);
            setStatus('success');

            onstarted && onstarted();

            screenTrack.onended = () => {
                stopShare(screenTrack);
                onended && onended();
            }
        } catch (error) {
            console.error(error);
            setStatus('rejected');
        }
    };

    const stopShare = (screenTrack) => {
        screenTrack.stop();
        stream.removeTrack(screenTrack);
        setScreenTrack(null);
        setStatus('idle');
    };


    return {
        screenTrack,
        startShare,
        stopShare,
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'rejected',
    }
}

export default useScreen;