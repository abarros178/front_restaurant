import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL, SOCKET_PATH } from '../config'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      transports: ["websocket", "polling"]
    });

    // Guardar el socket en el estado
    setSocket(newSocket);

    // Escuchar cuando el socket se conecte
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id); // Log para verificar la conexión
      newSocket.emit('requestLatestOrders'); // Solicitar las últimas órdenes
    });

    // Escuchar el evento latestOrders
    newSocket.on('latestOrders', (orders) => {
      console.log('Latest orders received:', orders); // Log para verificar qué órdenes se reciben
      setLatestOrders(orders);
    });

    // Manejar la desconexión
    newSocket.on('disconnect', () => {
      console.log('Socket disconnected'); // Log para ver si se desconecta
    });

    // Limpiar al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, latestOrders }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
