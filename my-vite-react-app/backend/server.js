const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const socketIo = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRoutes = require("./Routes/userRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const messageRoutes = require("./Routes/messageRoutes");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const DBConnect = require("./DBConnect");

const PORT = 5001;

app.use(cors());
app.use(express.json());

let events = []; // In-memory storage for events (Replace with a database in production)
let messages = []; // In-memory storage for messages

// **Run of Show Routes**

// Get all events
app.get("/run-of-show", (req, res) => {
  res.json(events);
});

// Add a new event
app.post("/run-of-show", (req, res) => {
  const newEvent = { id: uuidv4(), ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Update event status (Confirm or Decline)
app.put("/run-of-show/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  events = events.map((event) =>
    event.id === id ? { ...event, status } : event
  );

  const updatedEvent = events.find((event) => event.id === id);
  if (updatedEvent) {
    res.json(updatedEvent);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

// Delete Event
app.delete("/run-of-show/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = events.length;
  events = events.filter((event) => event.id !== id);

  if (events.length < initialLength) {
    res.json({ message: "Event deleted successfully" });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

// **Messages Routes**

app.get("/messages", (req, res) => {
  res.json(messages);
});

// Post a new message
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  io.emit("newMessage", newMessage); // Emit the message to all clients
  res.status(201).json(newMessage);
});

// Real-time messaging with Socket.io
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API Documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:5001", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API files
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Define your routes
app.get("/", (req, res) => {
  res.send(`Hello, World! ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/run-of-show", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
