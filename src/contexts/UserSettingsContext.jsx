import { useState, useEffect, createContext, useContext } from "react";

import { SocketContext } from './SocketContext';

import { append } from '../utils';

export const UsersStateContext = createContext({});
export const UsersUpdaterContext = createContext({});

const UsersSettingsProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);

    const [streams, setStreams] =  useState({});

    const [isMuted, setIsMuted] = useState({});
    const [isHidden, setIsHidden] = useState({});
    const [avatars, setAvatars] = useState({});
    const [names, setNames] = useState({});

    const [sharedScreenTrack, setSharedScreenTrack] = useState(null);

    useEffect(() => {
        socket.on('user-toggle-audio', (id) => {
            console.log('id', id)
            setIsMuted(append({ [id]: !isMuted[id] }))
        });

        return () => socket.off('user-toggle-audio');
    }, [isMuted]);

    useEffect(() => {
        socket.on('user-toggle-video', (id) => {
            console.log('vid', id)
            setIsHidden(append({ [id]: !isHidden[id] }))
        });

        return () => socket.off('user-toggle-video');
    }, [isHidden])

    return (
        <UsersStateContext.Provider value={{
            streams,
            isMuted,
            isHidden,
            avatars,
            names,
            sharedScreenTrack
        }}>
            <UsersUpdaterContext.Provider value={{
                setStreams,
                setIsHidden,
                setIsMuted,
                setAvatars,
                setNames,
                setSharedScreenTrack,
                muteUser: (id) => socket.emit('host:mute-user', id),
            }}>
                {children}
            </UsersUpdaterContext.Provider>
        </UsersStateContext.Provider>
    )
}

export default UsersSettingsProvider;
