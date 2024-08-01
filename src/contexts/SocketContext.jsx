'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { socket } from "../socket";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = () => setIsConnected(true);

    const disconnect = () => setIsConnected(false);

    socket.connect();

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext must be used within a RoomSocketProvider");
  }

  return context;
};
