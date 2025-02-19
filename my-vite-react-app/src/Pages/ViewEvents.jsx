function ViewEvents() {
  const events = [
    { id: 1, name: "Event 1", date: "2025-02-01", status: "Pending" },
    { id: 2, name: "Event 2", date: "2025-02-10", status: "Approved" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Events</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEvents;
