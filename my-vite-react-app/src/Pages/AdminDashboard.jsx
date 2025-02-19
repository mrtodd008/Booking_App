import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { People, Event, MailOutline, BarChart } from "@mui/icons-material";

function AdminDashboard() {
  const navigate = useNavigate();

  // Example stats (Replace with dynamic data from your backend/state management)
  const stats = {
    totalUsers: 0,
    pendingEvents: 0,
    unreadMessages: 0,
    monthlyEvents: 0,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Manage Users */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <People style={{ fontSize: "40px", color: "#007bff" }} />
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/admin/users")}
                style={{ marginTop: "10px" }}
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Events */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Event style={{ fontSize: "40px", color: "#28a745" }} />
              <Typography variant="h6">Pending Events</Typography>
              <Typography variant="h4">{stats.pendingEvents}</Typography>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => navigate("/admin/events")}
                style={{ marginTop: "10px" }}
              >
                View Events
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Messages */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <MailOutline style={{ fontSize: "40px", color: "#ffc107" }} />
              <Typography variant="h6">Unread Messages</Typography>
              <Typography variant="h4">{stats.unreadMessages}</Typography>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={() => navigate("/admin/messages")}
                style={{ marginTop: "10px" }}
              >
                View Messages
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <BarChart style={{ fontSize: "40px", color: "#17a2b8" }} />
              <Typography variant="h6">Monthly Events</Typography>
              <Typography variant="h4">{stats.monthlyEvents}</Typography>
              <Button
                variant="contained"
                color="info"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => navigate("/run-of-show")}
        style={{ marginTop: "10px" }}
      >
        Manage Run of Show
      </Button>
    </div>
  );
}

export default AdminDashboard;
