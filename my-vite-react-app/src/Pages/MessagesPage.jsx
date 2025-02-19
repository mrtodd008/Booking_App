import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button, TextField, Paper, Typography } from "@mui/material";

const socket = io("http://localhost:5001");

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch initial messages
    axios
      .get("http://localhost:5001/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages from server
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleMessageSubmit = () => {
    if (!newMessage) return;

    axios
      .post("http://localhost:5001/messages", { text: newMessage })
      .then(() => {
        setNewMessage("");
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Messages</Typography>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        {messages.map((message, index) => (
          <Typography key={index}>{message.text}</Typography>
        ))}
      </Paper>
      <TextField
        label="New Message"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ marginTop: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMessageSubmit}
        style={{ marginTop: "10px" }}
      >
        Send
      </Button>
    </div>
  );
}

export default MessagesPage;
