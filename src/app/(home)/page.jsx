
import { AppBar, Typography } from '@mui/material';

import JoinRoom from './JoinRoom';

export default function Home() {
  return (
    <div className='flex flex-col items-center w-full'>
      <AppBar position='static' color='inherit' className='flex flex-col justify-center items-center w-6/12 rounded-lg border-2 xs:w-full'>
        <Typography variant='h2' align='center'>Google Meet Clone</Typography>
      </AppBar>

      <JoinRoom />
    </div>
  );
}
