import { useContext } from 'react';

import { Mic, PhoneDisabled, Videocam, OpenInFull, PresentToAll, Chat } from '@mui/icons-material';

import CrossLineDiv from '../CrossLineDiv';
import ParticipantsCount from '../ParticipantsCount';

import { UserConnectionContext, UsersStateContext } from "../../contexts";

const Options = ({ 
    muted,
    visible,
    screenTrack,
    onToggle,
    onLeave,
    chat,
}) => {
    const common = 'p-3 rounded-xl text-white';
    const { sharedScreenTrack: shared, streams } = useContext(UsersStateContext);
    const { users } = useContext(UserConnectionContext);

    return (
        <>
            {(screenTrack || shared) && (
                <button
                    onClick={() => onToggle('fullscreen')}
                    className={`${common} bg-slate-800 hover:bg-emerald-700`}
                >
                    <OpenInFull className="w-6 h-6" />
                </button>
            )}

            <div className="flex flex-auto gap-6 place-content-center items-center">
                <button
                    onClick={() => onToggle('video', Object.values(users))}
                    data-for="visibility"
                    data-tip={`${!visible ? 'switch on' : 'switch off'}`}
                    className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
                >
                    <Videocam className="h-6 w-6" />
                    {!visible && <CrossLineDiv />}
                </button>

                <button
                    onClick={() => onToggle('audio')}
                    data-for="audio"
                    data-tip={`${muted ? 'unmute' : 'mute'}`}
                    className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
                >
                <Mic className="h-6 w-6" />
                    {muted && <CrossLineDiv />}
                </button>

                <button
                    onClick={onLeave}
                    data-for="hangUp"
                    data-tip="hang up"
                    className={`${common} bg-red-600 hover:bg-red-500`}
                >
                    <PhoneDisabled className="h-7 w-7" />
                </button>

                <button
                    onClick={() => onToggle('screen')}
                    disabled={shared}
                    className={`${common} ${
                        screenTrack
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-slate-800 hover:bg-emerald-700'
                    }`}
                    data-for="shareScreen"
                    data-tip="share your screen"
                >
                    <PresentToAll className="h-6 w-6" />
                </button>

                <button
                    data-for="chat"
                    data-tip="chat with everyone"
                    onClick={() => onToggle('chat')}
                    className={`${common} ${
                        chat
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-slate-800 hover:bg-emerald-700'
                    }`}
                >
                    <Chat className="w-6 h-6" />
                </button>

                <ParticipantsCount
                    onClick={() => onToggle('users')}
                    count={Object.keys(streams).length + 1}
                />
            </div>
        </>
    );
}

export default Options;