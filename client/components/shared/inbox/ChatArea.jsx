"use client";

import useAuthenticated from "@/hooks/useAuthenticated";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByMessageId } from "@/state/actions/message";
import { createSummary, fetchSummary } from "@/state/actions/summary";
import { createSuggestion, fetchSuggestion } from "@/state/actions/suggestion";
import { useParams } from "next/navigation";

const ChatArea = () => {
  const [socket, setSocket] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState({});
  const [userList, setUserList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState("");

  const messageEndRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const suggestion = useSelector((state) => state?.suggestion?.suggestion?.[0]);
  const recipientId = useSelector((state) => state.conversation.selectedConversationId);
  const userSummary = useSelector((state) => state?.summaryReducer?.summary?.[0]);
  const reduxMessages = useSelector((state) => state.message || {});
  const { user } = useAuthenticated();
  const senderId = user?._id;
  const userName = user?.username;

  // Parse and display suggestions from Redux
  useEffect(() => {
    if (suggestion && typeof suggestion === "object" && suggestion.suggestion) {
      const parsed = suggestion.suggestion
        .split("\n")
        .map((item) => item.replace(/^\*\s*/, "").trim())
        .filter(Boolean);
      setSuggestions(parsed);
    }
  }, [suggestion]);

  // Fetch messages when recipient is selected
  useEffect(() => {
    if (recipientId && senderId) {
      const messageId = `${senderId}_SR_${recipientId}`;
      dispatch(getMessagesByMessageId(messageId));
    }
  }, [recipientId, senderId]);

  // Fetch suggestion by ID from URL
  useEffect(() => {
    dispatch(fetchSuggestion(id));
  }, [id]);

  // Normalize messages from Redux and store in local state
  useEffect(() => {
    if (recipientId && senderId && reduxMessages) {
      const messageId = `${senderId}_SR_${recipientId}`;
      const messagesForConversation = reduxMessages[messageId] || [];

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

  const messagesArray = messages[recipientId] || [];
  const longStringWithNewlines = messagesArray.map((msg) => msg.message).join("\n");

  // Send message via socket
  const handleSendMessage = () => {
    if (messageText && recipientId && senderId && socket) {
      socket.emit("message", {
        recipientId,
        message: messageText,
        userId: senderId,
      });

      setMessages((prevMessages) => {
        const existingMessages = prevMessages[recipientId] || [];
        return {
          ...prevMessages,
          [recipientId]: [...existingMessages, { senderId, message: messageText }],
        };
      });

      setMessageText("");
      setSelected(""); // clear suggestion use
    } else {
      alert("Please select a recipient and enter a message.");
    }
  };

  // Create summary after messages are updated
  useEffect(() => {
    if (senderId && recipientId && longStringWithNewlines) {
      const messageId = `${senderId}_SR_${recipientId}`;
      dispatch(createSummary({ messageId, summary: longStringWithNewlines }));
      dispatch(fetchSummary(messageId));
    }
  }, [longStringWithNewlines]);

  // Create suggestion from summary
  useEffect(() => {
    const messageId = `${senderId}_SR_${recipientId}`;
    if (userSummary?.summary && senderId && recipientId) {
      dispatch(
        createSuggestion({
          messageId,
          suggestion: userSummary.summary,
        })
      ).catch((err) => {
        console.error("Suggestion dispatch failed:", err);
      });
    }
  }, [userSummary?.summary, senderId, recipientId]);

  // Socket.IO connection
  useEffect(() => {
    if (!user?._id || !user?.username || socket) return;

    const newSocket = io("http://localhost:8800", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      newSocket.emit("set-name", { userId: user._id, name: user.username });
    });

    newSocket.on("message", (message) => {
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
      newSocket.disconnect();
    };
  }, [user?._id, user?.username]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => {
    setMessageText(e.target.value);
    setSelected("");
  };

  return (
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
                className={`flex items-start space-x-3 ${
                  isOwnMessage ? "justify-end flex-row-reverse" : ""
                }`}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div
                  className={`p-4 rounded-xl shadow text-sm ${
                    isOwnMessage
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  } max-w-[300px] w-fit break-words`}
                >
                  {message.message}
                </div>
              </div>
            );
          })}
        <div ref={messageEndRef} />
      </div>

      <footer className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-700 mb-2">Suggested:</div>
        <div className="flex items-center justify-center text-center">
          {suggestions.map((text, index) => (
            <button
              key={index}
              onClick={() => {
                setMessageText(text);
                setSelected(text);
              }}
              className="p-1 m-2 border border-blue-300 rounded hover:bg-blue-100 transition w-[50%]"
            >
              {text}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={messageText}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </footer>
    </main>
  );
};

export default ChatArea;
