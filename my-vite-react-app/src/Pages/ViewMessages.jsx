import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

function ViewMessages() {
  // Example message data (replace with backend data later)
  const initialMessages = [
    {
      id: 1,
      sender: "DJ Doe",
      content: "Hi, I need help!",
      date: "2025-01-25",
    },
    {
      id: 2,
      sender: "DJ Smith",
      content: "Can you approve my event?",
      date: "2025-01-24",
    },
    {
      id: 3,
      sender: "DJ Johnson",
      content: "I can't log in.",
      date: "2025-01-23",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");

  // Function to handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Function to delete a message
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  // Filter messages based on the search query
  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        View Messages
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Messages"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />

      {/* Messages Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.sender}</TableCell>
                <TableCell>{message.content}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                No messages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewMessages;
