import React from "react";
import Message from "./Message";

const ChatBox = ({ messages, loading }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
      {loading && <p className="loading">Typing...</p>}
    </div>
  );
};

export default ChatBox;
