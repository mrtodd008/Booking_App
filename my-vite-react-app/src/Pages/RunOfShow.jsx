// Import required hooks and dependencies
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function RunOfShow() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    date: "",
    venue: "",
    startTime: "",
    endTime: "",
    dj: "",
    status: "Pending",
  });

  // Fetch events on mount
  useEffect(() => {
    axios
      .get("http://localhost:5001/run-of-show")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Open and close event creation modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEvent({
      date: "",
      venue: "",
      startTime: "",
      endTime: "",
      dj: "",
      status: "Pending",
    });
  };

  // Open and close DJ response modal
  const handleResponseOpen = (event) => {
    setSelectedEvent(event);
    setResponseDialogOpen(true);
  };
  const handleResponseClose = () => setResponseDialogOpen(false);

  // Handle input change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Handle event submission
  const handleSubmit = () => {
    axios
      .post("http://localhost:5001/run-of-show", newEvent)
      .then((res) => {
        setEvents([...events, res.data]);
        handleClose();
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  // Handle DJ confirmation or denial
  const handleDJResponse = (eventId, response) => {
    axios
      .put(`http://localhost:5001/run-of-show/${eventId}`, { status: response })
      .then((res) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, status: res.data.status } : event
          )
        );
        handleResponseClose();
      })
      .catch((err) => console.error("Error updating event status:", err));
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:5001/run-of-show/${eventId}`)
      .then(() => {
        setEvents(events.filter((event) => event.id !== eventId));
      })
      .catch((err) => console.error("Error deleting event:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Run of Show</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Event
      </Button>

      {/* Events Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>DJ</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{event.startTime}</TableCell>
                <TableCell>{event.endTime}</TableCell>
                <TableCell>{event.dj}</TableCell>
                <TableCell
                  style={{
                    color:
                      event.status === "Confirmed"
                        ? "green"
                        : event.status === "Declined"
                        ? "red"
                        : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {event.status}
                </TableCell>
                <TableCell>
                  {event.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleResponseOpen(event)}
                    >
                      Respond
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteEvent(event.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Event Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            name="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Venue"
            name="venue"
            fullWidth
            value={newEvent.venue}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Start Time"
            type="time"
            name="startTime"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.startTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="End Time"
            type="time"
            name="endTime"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.endTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="DJ"
            name="dj"
            fullWidth
            value={newEvent.dj}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* DJ Response Modal */}
      <Dialog open={responseDialogOpen} onClose={handleResponseClose}>
        <DialogTitle>Confirm or Decline Event</DialogTitle>
        <DialogContent>
          <p>Do you accept this event?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDJResponse(selectedEvent.id, "Declined")}
            color="secondary"
          >
            Decline
          </Button>
          <Button
            onClick={() => handleDJResponse(selectedEvent.id, "Confirmed")}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RunOfShow;
