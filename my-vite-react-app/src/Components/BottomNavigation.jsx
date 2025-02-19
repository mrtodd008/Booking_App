import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const [value, setValue] = useState(0); // Keeps track of the selected tab
  const navigate = useNavigate();

  // Array mapping tab indices to their respective routes
  const routes = ["/", "/events", "/profile", "/chat", "/notifications"];

  const handleNavigation = (event, newValue) => {
    setValue(newValue); // Update the selected tab
    navigate(routes[newValue]); // Navigate to the corresponding route
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#007bff", // Blue background
        zIndex: 1000,
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        style={{ color: value === 0 ? "white" : "rgba(255, 255, 255, 0.7)" }}
      />
      <BottomNavigationAction
        label="Events"
        icon={<EventIcon />}
        style={{ color: value === 1 ? "white" : "rgba(255, 255, 255, 0.7)" }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        style={{ color: value === 2 ? "white" : "rgba(255, 255, 255, 0.7)" }}
      />
      <BottomNavigationAction
        label="Chat"
        icon={<ChatIcon />}
        style={{ color: value === 3 ? "white" : "rgba(255, 255, 255, 0.7)" }}
      />
      <BottomNavigationAction
        label="Notifications"
        icon={<NotificationsIcon />}
        style={{ color: value === 4 ? "white" : "rgba(255, 255, 255, 0.7)" }}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
