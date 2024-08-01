'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Paper, Button, TextField } from '@mui/material';

const JoinRoom = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const joinRoom = () => router.push(`/room/${name}`);

  const createRoom = () => {
    const test = 'tes-trc-asa';
    router.push(`/room/${test}`);
  };

  return (
      <Paper className='mt-4'>
        <div className='flex align-center gap-3 mb-4'>
            <form noValidate autoComplete='off'>
                <TextField label="name" value={name} onChange={(e) => setName(e.target.value)} />
            </form>
          <Button variant='contained' color="primary" onClick={joinRoom}>Join Room</Button>
        </div>
          <Button variant='contained' color="primary" onClick={createRoom} fullWidth>Create Room</Button>
      </Paper>
  );
}

export default JoinRoom;
