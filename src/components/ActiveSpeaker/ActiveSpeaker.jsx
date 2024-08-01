'use client';

import SpeakerIcon from './SpeakerIcon';

import { useIsAudioActive } from '../../hooks';

const ActiveSpeaker = ({ stream }) => {
    return useIsAudioActive({ source: stream }) ? (
        <div className="rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
            <SpeakerIcon />
        </div>
    ) : null
    
}

export default ActiveSpeaker;
