import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = io();

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = { user: 'Anonumys', message: inputMessage.trim() };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit('message', newMessage);
            setInputMessage('');
        }
    };

    return (
        <section className="chat__section">
            <div className="brand">
                
                <h1>SYNC-TEXT</h1>
               
            </div>
            <div className="message__area">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.user === 'You' ? 'outgoing' : 'incoming'}`}
                    >
                        <h4>{msg.user}</h4>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    id="textarea"
                    cols="30"
                    rows="1"
                    placeholder="Write a message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                ></textarea>
            </div>
            <button className="btn sendBtn" onClick={sendMessage}>
                Send
            </button>
        </section>
    );
};

export default ChatApp;
