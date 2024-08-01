'use client';

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

import Message from '../Message';

import { useSocketContext } from '../../contexts';
import { append, formatTimeHHMM } from '../../utils';

const Chat = () => {
    const { socket } = useSocketContext();
    const { data: session } = useSession();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) return;

        socket.on('chat:get', (message) => setMessages(append(message)));

        return () => socket.off('chat:get');
    }, []);

    const sendMessage = (event) => {
        const messageText = event.target.value;
        const lastMessage = messages.at(-1);

        if(event.key === 'Enter' && messageText) {
            const timeHHMM = formatTimeHHMM(Date.now());
            const message = {
                username: session.user.name,
                text: messageText,
                time: timeHHMM,
                shouldAggregate: lastMessage?.user === 'You' && lastMessage?.time === timeHHMM,
            }
            socket.emit('chat:post', message);
            setMessages(append({ ...message, user: 'You' }))
            setText('');
        }
    }
    
    return (
        <>
            <div className="overflow-y-auto h-[calc(100vh-10rem)]">
                {messages.map((message, index) => (
                    <Message
                        key={`${message.time}-${index}`}
                        message={message}
                        isLast={index === messages.length - 1}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center pr-6 pt-6">
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={sendMessage}
                    className="p-4 bg-transparent outline-none block w-full text-sm border border-gray-300/[.5] rounded-2xl"
                    placeholder="Send a message to everyone"
                    autoComplete="off"
                />
            </div>
        </>
    )
}

export default Chat;
