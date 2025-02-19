import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login"); // Navigate to login screen
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout action
    handleMenuClose();
    navigate("/login"); // Navigate to login screen after logout
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#007bff" }}>
      <Toolbar>
        {/* Logo or App Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
        >
          DJ App
        </Typography>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: "flex", gap: "20px" }}>
          <Typography
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Home
          </Typography>
          <Typography
            component={Link}
            to="/events"
            style={{ textDecoration: "none", color: "white" }}
          >
            Events
          </Typography>
          <Typography
            component={Link}
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            Profile
          </Typography>
        </div>

        {/* Mobile Menu Icon */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{
            display: { xs: "block", sm: "none" }, // Ensure visibility on small screens
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">
            Home
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/events">
            Events
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin">
            Admin
          </MenuItem>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
