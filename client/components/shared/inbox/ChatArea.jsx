"use client"

import useAuthenticated from '@/hooks/useAuthenticated';
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesByMessageId } from '@/state/actions/message';

const ChatArea = () => {
    const [socket, setSocket] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState({}); // { senderId: [{senderId, message}], senderId2: [] }
    const [userList, setUserList] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [greetingMessage, setGreetingMessage] = useState(''); // Personalized greeting
    const messageEndRef = useRef(null);
    const dispatch = useDispatch();
    console.log(messages)


    const recipientId = useSelector(state => state.conversation.selectedConversationId);
    const { user } = useAuthenticated();
    const senderId = user?._id;
    const userName = user?.username;
    const reduxMessages = useSelector(state => state.message || {});

    useEffect(() => {
        if (recipientId && senderId) {
            const messageId = `${senderId}_SR_${recipientId}`;
            dispatch(getMessagesByMessageId(messageId));
        }
    }, [recipientId, senderId]);

    useEffect(() => {
        if (recipientId && senderId && reduxMessages) {
            const messageId = `${senderId}_SR_${recipientId}`;
            const messagesForConversation = reduxMessages[messageId] || [];

            // Normalize messages if needed
            const normalizedMessages = messagesForConversation.map((msg) => ({
                ...msg,
                message: msg.content || msg.message,
            }));

            setMessages((prev) => ({
                ...prev,
                [recipientId]: normalizedMessages,
            }));
        }
    }, [reduxMessages, recipientId, senderId]);

    console.log(messages)


    console.log(senderId);
    console.log(recipientId)





    useEffect(() => {
        if (!user?._id || !user?.username) return;
        if (socket) return;
        const newSocket = io('http://localhost:8800', {
            transports: ['websocket'], // Optional: to force WS protocol
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to Socket.IO server");
            newSocket.emit("set-name", { userId: user._id, name: user.username });
        });

        newSocket.on("message", (message) => {
            console.log("Received message:", message);
            setMessages((prevMessages) => {
                const senderId = message.senderId;
                const existingMessages = prevMessages[senderId] || [];
                return {
                    ...prevMessages,
                    [senderId]: [...existingMessages, message],
                };
            });
        });

        newSocket.on("error", (errorMessage) => {
            alert(errorMessage);
        });

        return () => {
            console.log("Disconnecting from Socket.IO server");
            newSocket.disconnect();
        };
    }, [user?._id, user?.username]); // ✅ Only run when user is fully available
    // <-- Trigger only when user is available



    //saying not found recipent even after passing check the logs in backend for this and start the online chat, after this u have to working on storing those messages to db 

    const handleSendMessage = () => {
        console.log(recipientId)
        console.log(senderId)
        console.log(socket)
        console.log(messageText)
        if (messageText && recipientId && senderId && socket) {
            socket.emit("message", {
                recipientId: recipientId,
                message: messageText,
                userId: senderId,
            });
            setMessages((prevMessages) => {
                const existingMessages = prevMessages[recipientId] || [];
                return {
                    ...prevMessages,
                    [recipientId]: [...existingMessages, { senderId: senderId, message: messageText }],
                };
            });
            setMessageText('');
        } else {
            alert('Please select a recipient and enter a message.');
        }
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getLatestMessage = (senderId) => {
        const userMessages = messages[senderId];
        if (userMessages && userMessages.length > 0) {
            return userMessages[userMessages.length - 1].message;
        }
        return '';
    };


    return (
        <>
            <main className="flex-1 flex flex-col bg-white border-r border-gray-100">
                <div className="p-[1.165rem] border-b border-gray-200">
                    <h2 className="text-sm font-semibold">Luis Easton</h2>
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {recipientId &&
                        messages[recipientId] &&
                        messages[recipientId].map((message, index) => {
                            const isOwnMessage = message.senderId === senderId;

                            return (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-3 ${isOwnMessage ? 'justify-end flex-row-reverse' : ''}`}
                                >
                                    {/* Profile circle */}
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

                                    {/* Message bubble */}
                                    <div
                                        className={`p-4 rounded-xl shadow text-sm 
                ${isOwnMessage
                                                ? 'bg-blue-100 text-blue-900'
                                                : 'bg-gray-100 text-gray-900'}
                max-w-[300px] w-fit break-words`}
                                    >
                                        {message.message}
                                    </div>
                                </div>

                            );
                        })}

                    {/* Scroll Anchor */}
                    <div ref={messageEndRef} />
                </div>

                <footer className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <input type="text" value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border rounded-lg text-sm" />
                        <button onClick={handleSendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Send</button>
                    </div>
                </footer>
            </main>
        </>
    )
}

export default ChatArea