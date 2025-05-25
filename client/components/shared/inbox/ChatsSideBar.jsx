"use client";
import {
  createConv,
  getConversations,
  setSelectedConversation,
} from "@/state/actions/conversation";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUsersByRole } from "@/state/actions/users";
import useAuthenticated from "@/hooks/useAuthenticated";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRelativeTime } from "@/utils/method";
import Image from "next/image";

const ChatsSideBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversationId
  );
  console.log(selectedConversation);
  const state = useSelector((state) => state);
  console.log(state);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { user: currentUser } = useAuthenticated();

  const users = useSelector((state) => state.users.users || []);
  const conversations = useSelector(
    (state) => state.conversation.conversations
  );
  console.log(conversations , "This are Conversations");
  const filteredUsers = useMemo(() => {
    return users?.filter((user) => user?._id !== currentUser);
  }, [users, currentUser?._id]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getUsersByRole("customer"));
      setTimeout(() => {
        dispatch(getConversations(currentUser?._id));
      }, 2000);
    }
  }, [currentUser?._id, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleCreateConversation = (recipientId, recipientName) => {
    if (!currentUser?._id || !recipientId) return;

    const formData = {
      senderId: currentUser?._id,
      recipientId,
    };

    dispatch(createConv(formData, recipientName)).then(() => {
      // After creating the conversation, navigate to the appropriate route
      const route = `/inbox/${currentUser?._id}_SR_${recipientId}`;
      dispatch(setSelectedConversation(recipientId)); // Set it as selected
      dispatch(getUserById(recipientId));
      router.push(route);
    });

    setShowDropdown(false);
  };

  // also i think username is not getting added in conversations array of local state when convo is created and along with this in chat area header we have to display the username

  return (
    <aside className="w-[301px] bg-white border-r border-gray-200 p-0 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between relative">
        <Link href="/">
          <h2 className="text-sm cursor-pointer font-semibold">
            {currentUser?.username
              ? `Hey👋 ${currentUser?.username}`
              : "Your Inbox"}
          </h2>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-sm px-2 cursor-pointer py-[2px] border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
          >
            Available Users
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="text-sm max-h-60 overflow-auto">
                {filteredUsers?.length > 0 ? (
                  filteredUsers?.map((user, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleCreateConversation(user?._id, user?.name)
                      }
                    >
                      {user?.name ||
                        user?.username ||
                        user?.email ||
                        `User ${index + 1}`}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">No users found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-1 overflow-y-auto flex justify-center items-center flex-col">
        {conversations &&
          conversations?.map((item, index) => {
            const isSelected = selectedConversation === item?.chatWith?.id;
            const isOwnMessage = currentUser._id === item?.chatWith?.id;

            return (
              <Link
                key={index}
                href={`/inbox/${currentUser?._id}_SR_${item?.chatWith?.id}`}
                onClick={() => {
                  dispatch(setSelectedConversation(item?.chatWith?.id));
                  dispatch(getUserById(item?.chatWith?.id));
                }}
                className="m-0"
              >
                <div className="mt-1">
                  <div
                    className={`relative cursor-pointer p-[1rem] w-[284px] rounded-lg
                    ${
                      isSelected
                        ? "bg-blue-100 border-blue-200"
                        : "hover:bg-gray-100 border-transparent"
                    }
                    border flex items-center justify-center space-x-3`}
                  >
                    <Image
                      className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      // src={item.chatWith.imageUrl || "https://cdn4.iconfinder.com/data/icons/fashion-icons/154/hipster-512.png"}
                      src=   {item?.chatWith?.imageUrl}
                      alt="User Avatar"
                      width={40}
                      height={40}
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        {item?.chatWith?.username}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {item?.lastMessage
                          ? item?.lastMessage?.length > 20
                            ? item?.lastMessage?.slice(0, 20) + "..."
                            : item?.lastMessage
                          : `Say Hi to ${item.chatWith.username}`}
                      </p>
                      <span className="text-xs text-gray-400">
                        {getRelativeTime(
                          item?.lastMessageTime,
                          "Click here to start Chat"
                        )}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                      *
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </aside>
  );
};

export default ChatsSideBar;
