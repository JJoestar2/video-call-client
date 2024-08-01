'use client';

import { useState, useEffect } from 'react';

const useIsAudioActive = ({
    source,
    fftSize = 1024
}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (!source) return;

        const auidoContext = new AudioContext();
        const analyser = new AnalyserNode(auidoContext, { fftSize });

        const audioSource = auidoContext.createMediaStreamSource(source);
        // * connect your source to output (usually laptop's mic)
        audioSource.connect(analyser);

        // * buffer length gives us how many different frequencies we are going to be measuring
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const update = () => {
            analyser.getByteTimeDomainData(dataArray);

            const sum = dataArray.reduce((a, b) => a + b, 0);

            if (sum / dataArray.length / 128.0 >= 1) {
                setIsSpeaking(true);
                setTimeout(() => setIsSpeaking(false), 1000);
            }

            requestAnimationFrame(update);
        }

        update();

        return () => setIsSpeaking(false);
    }, [source]);

    return isSpeaking;
};

export default useIsAudioActive;
