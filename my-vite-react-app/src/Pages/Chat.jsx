import { useState } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]); // State to store messages
  const [newMessage, setNewMessage] = useState(""); // State for the current input

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Don't send empty messages
    const messageObject = {
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      sender: "You", // For now, all messages are from the current user
    };
    setMessages([...messages, messageObject]); // Add new message to the list
    setNewMessage(""); // Clear the input
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      {/* Chat Window */}
      <div className="chat-window">
        {messages.length === 0 ? (
          <p className="no-messages">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "You" ? "outgoing" : "incoming"
              }`}
            >
              <p className="message-text">{message.text}</p>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
