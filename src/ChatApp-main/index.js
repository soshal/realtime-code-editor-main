import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Index = () => {
  useEffect(() => {
    const socket = io(); // Connect to the Socket.IO server
    // You can add your Socket.IO event listeners and handlers here

    // Example event listener
    socket.on('message', (message) => {
      console.log('Received message:', message);
      // You can update the message area or handle the message in your UI
    });

    // Clean up function to disconnect from the Socket.IO server when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <section className="chat__section">
        <div className="brand">
          <img src="/chat.png" alt="" />
          <h1>okie dokie</h1>
        </div>
        <div className="message__area"></div>
        <div>
          <textarea id="textarea" cols="30" rows="1" placeholder="Write a message"></textarea>
        </div>
      </section>
    </div>
  );
};

export default Index;
