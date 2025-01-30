import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserMessage, fetchChatResponse } from "../redux/chatSlice";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(fetchChatResponse(input));

    setInput("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
