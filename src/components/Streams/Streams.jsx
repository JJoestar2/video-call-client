'use client';

import { useContext } from 'react';

import { UsersStateContext, UserConnectionContext } from "../../contexts";

import MyStream from '../MyStream';
import OtherStreams from './OtherStreams';

const Streams = ({
  fullscreen,
  sharedScreen,
  stream,
  muted,
  visible,
}) => {
  const shared = sharedScreen ?? useContext(UsersStateContext).sharedScreenTrack;

  const { myId } = useContext(UserConnectionContext);

  return (
    <div
      className={`${
        fullscreen && shared ? 'hidden' : ''
      } flex flex-wrap gap-4 justify-around ${shared ? 'basis-1/6' : ''}`}
    >
      <MyStream stream={stream} muted={muted} visible={visible} id={myId} />
      <OtherStreams />
    </div>
  );
}

export default Streams;