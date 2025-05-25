"use client";

import { createAIchat, getAIChat } from "@/state/actions/aiChat";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AISidebar = () => {
  const aiChats = useSelector(
    (state) => state.aiChatReducer?.aiChat?.[0]?.chats || []
  );

  const { id } = useParams();
  const selectedUserDetails = useSelector(
    (state) => state.users.selectedUserDetails || []
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef(null);

  const handleAskAI = async () => {
    await dispatch(
      createAIchat({
        messageId: id,
        aiContent: inputValue,
        userContent: inputValue,
      })
    );
    setInputValue("");

    // Fetch updated chat after small delay
    setTimeout(() => {
      dispatch(getAIChat());
    }, 200);
  };

  // Scroll to bottom when aiChats change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiChats]);

  useEffect(() => {
    dispatch(getAIChat());
  }, [dispatch]);

  const parseText = (text) => {
    const plainText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^\s*[\*\-]\s+/gm, "• ")
      .trim();

    return plainText;
  };

  return (
    <aside className="w-[350px] bg-[#f9f9fb] flex flex-col border-gray-200">
      {selectedUserDetails.username ? (
        <>
          <div className="p-[1.165rem] border-b border-gray-200">
            <h2 className="text-sm font-semibold">AI Copilot</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {aiChats.filter((chat) => chat.messageId === id).length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                Hi, I’m Fin AI Copilot
                <div className="mt-1 text-xs text-gray-400">
                  Ask me anything about this conversation.
                </div>
              </div>
            ) : (
              aiChats
                .filter((chat) => chat.messageId === id)
                .map((chat, index, arr) => (
                  <div key={chat._id} className="mb-4">
                    <div className="font-semibold text-xs text-gray-600 mb-1">
                      You:
                    </div>
                    <div className="bg-white rounded p-2 text-sm mb-1">
                      {chat.userContent || chat.content}
                    </div>

                    <div className="font-semibold text-xs text-blue-600 mb-1">
                      AI:
                    </div>
                    <div className="bg-blue-50 rounded p-2 text-sm whitespace-pre-line">
                      {parseText(chat.aiContent || chat.content)}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {chat.createdAt
                        ? new Date(chat.createdAt).toLocaleString()
                        : ""}
                    </div>

                    {/* Ref only on the last message */}
                    {index === arr.length - 1 && (
                      <div ref={messageEndRef} />
                    )}
                  </div>
                ))
            )}
          </div>

          <footer className="p-4 border-t border-gray-200">
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAskAI();
                }
              }}
              placeholder="Ask a question..."
              className="mt-4 w-full px-3 py-2 border rounded-lg text-sm"
            />
            <button
              onClick={handleAskAI}
              disabled={!inputValue.trim()}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full hover:bg-blue-700 cursor-pointer"
            >
              Ask AI
            </button>
          </footer>
        </>
      ) : null}
    </aside>
  );
};

export default AISidebar;
