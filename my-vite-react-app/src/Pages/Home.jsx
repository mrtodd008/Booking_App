import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "10px",
          padding: "30px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to DJ App
        </Typography>
        <Typography variant="h6">
          Your one-stop solution for managing events, schedules, and profiles.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: "20px", backgroundColor: "white", color: "#007bff" }}
          onClick={handleGetStarted} // Add onClick handler
        >
          Get Started
        </Button>
      </Box>

      {/* Upcoming Features Section */}
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "20px" }}>
        Upcoming Features:
      </Typography>
      <Grid container spacing={3}>
        {/* Feature 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <NotificationsActiveIcon
              sx={{ fontSize: "50px", color: "#007bff", marginBottom: "10px" }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Real-time Notifications
              </Typography>
              <Typography variant="body2">
                Stay updated with instant alerts for events and messages.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <EventAvailableIcon
              sx={{ fontSize: "50px", color: "#007bff", marginBottom: "10px" }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Event Approval by Admins
              </Typography>
              <Typography variant="body2">
                Approve or reject events seamlessly with our admin dashboard.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <MessageIcon
              sx={{ fontSize: "50px", color: "#007bff", marginBottom: "10px" }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Messaging System
              </Typography>
              <Typography variant="body2">
                Communicate with users directly from the app.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
