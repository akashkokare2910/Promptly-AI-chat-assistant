import React from "react";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import "./styles.css";

const ChatApp = () => {
  const { messages, loading } = useSelector((state) => state.chat);

  return (
    <div className="chat-container">
      <h2 className="heading">AI Chat Assistant</h2>

      {/* Unique content */}
      <ChatBox messages={messages} loading={loading} />
      <ChatInput />
    </div>
  );
};

export default ChatApp;
