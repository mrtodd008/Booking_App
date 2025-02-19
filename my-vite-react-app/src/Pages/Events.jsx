import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import Calendar styles

function Events() {
  const [events, setEvents] = useState(() => {
    // Load events from localStorage if available
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    // Save events to localStorage whenever they change
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      const newEventObj = {
        id: events.length + 1,
        name: newEvent,
        date: selectedDate.toISOString().split("T")[0], // Selected date
      };
      setEvents([...events, newEventObj]);
      setNewEvent("");
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Filter events for the selected date
  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Events</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={({ date, view }) =>
          view === "month" &&
          events.some(
            (event) => event.date === date.toISOString().split("T")[0]
          ) ? (
            <div
              style={{
                marginTop: "5px",
                backgroundColor: "#28a745", // Changed color to green
                color: "white",
                borderRadius: "50%",
                width: "8px",
                height: "8px",
                margin: "0 auto",
              }}
            ></div>
          ) : null
        }
      />

      <h3 style={{ marginTop: "20px" }}>
        Events on {selectedDate.toISOString().split("T")[0]}
      </h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new event"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "70%",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleAddEvent}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Event
        </button>
      </div>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        {eventsForSelectedDate.length > 0 ? (
          eventsForSelectedDate.map((event) => (
            <li
              key={event.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{event.name}</strong> - {event.date}
              </div>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li style={{ color: "#888" }}>No events for this day.</li>
        )}
      </ul>
    </div>
  );
}

export default Events;
