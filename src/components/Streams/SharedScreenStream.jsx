'use client';

import { useContext } from 'react';

import SharedScreen from '../SharedScreen';

import { UsersStateContext } from "../../contexts";

const SharedScreenStream = ({
    sharedScreen,
    fullscreen,
}) => {
    const { sharedScreenTrack } = useContext(UsersStateContext);
    const screenTrack = sharedScreen ?? sharedScreenTrack;

    return screenTrack ? (
        <div className={`flex justify-center ${
            fullscreen ? 'basis-6/6' : 'basis-5/6'
          }`}
        >
            <SharedScreen sharedScreenTrack={screenTrack} />
        </div>
    ) : null;
};

export default SharedScreenStream;
