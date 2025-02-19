import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";

function UserProfile() {
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
  });
  const [editOpen, setEditOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rosConfirmed, setRosConfirmed] = useState(false);

  // Load stored profile data
  useEffect(() => {
    setProfilePic(localStorage.getItem("profilePic") || null);
    setBio(localStorage.getItem("bio") || "");
    setSocialLinks(
      JSON.parse(localStorage.getItem("socialLinks")) || {
        instagram: "",
        linkedin: "",
      }
    );
    setRosConfirmed(localStorage.getItem("rosConfirmed") === "true");
  }, []);

  // Handle file selection and validation (max 20MB)
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 20 * 1024 * 1024; // 20MB in bytes

      if (!validTypes.includes(file.type)) {
        alert("Only JPEG and PNG files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size should be less than 20MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setSelectedFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Ensure valid social media URLs
  const formatLink = (url, type) => {
    if (!url) return "";
    if (!url.startsWith("http")) {
      return type === "instagram"
        ? `https://instagram.com/${url.replace("@", "")}`
        : `https://linkedin.com/in/${url.replace("@", "")}`;
    }
    return url;
  };

  // Save profile updates
  const handleSave = () => {
    const updatedLinks = {
      instagram: formatLink(socialLinks.instagram, "instagram"),
      linkedin: formatLink(socialLinks.linkedin, "linkedin"),
    };
    const finalProfilePic = selectedFile || profilePic;

    // Save values to localStorage
    localStorage.setItem("profilePic", finalProfilePic);
    localStorage.setItem("bio", bio);
    localStorage.setItem("socialLinks", JSON.stringify(updatedLinks));

    setProfilePic(finalProfilePic);
    setSocialLinks(updatedLinks);

    // Close the modal after a short delay
    setTimeout(() => setEditOpen(false), 100);
  };

  // Handle R.O.S. confirmation
  const confirmRos = () => {
    setRosConfirmed(true);
    localStorage.setItem("rosConfirmed", "true");
  };

  return (
    <Paper
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>My Profile</h2>

      {/* Profile Picture */}
      <div style={{ marginBottom: "15px" }}>
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #000",
            }}
          />
        ) : (
          <p>No profile picture</p>
        )}
      </div>

      {/* Bio Section */}
      <p>{bio || "No bio available."}</p>

      {/* Social Links */}
      <h3>Social Links</h3>
      {socialLinks.instagram && (
        <p>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d62976", fontWeight: "bold" }}
          >
            Instagram
          </a>
        </p>
      )}
      {socialLinks.linkedin && (
        <p>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0077b5", fontWeight: "bold" }}
          >
            LinkedIn
          </a>
        </p>
      )}

      {/* Confirm R.O.S. */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          background: rosConfirmed ? "#d4edda" : "#f8d7da",
          borderRadius: "10px",
        }}
      >
        <h3>Run of Show Confirmation</h3>
        {rosConfirmed ? (
          <p style={{ color: "#155724" }}>You have confirmed the schedule.</p>
        ) : (
          <Button variant="contained" color="primary" onClick={confirmRos}>
            Confirm R.O.S.
          </Button>
        )}
      </div>

      {/* Buttons */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditOpen(true)}
        style={{ margin: "10px" }}
      >
        Edit Profile
      </Button>
      <Button
        variant="contained"
        color="secondary"
        href="/messages"
        style={{ margin: "10px" }}
      >
        View Messages
      </Button>

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* Profile Picture Upload */}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {selectedFile && (
            <img
              src={selectedFile}
              alt="Preview"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />
          )}

          <TextField
            margin="dense"
            label="Bio"
            fullWidth
            multiline
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Instagram Username or Link"
            fullWidth
            value={socialLinks.instagram}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, instagram: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="LinkedIn Username or Link"
            fullWidth
            value={socialLinks.linkedin}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, linkedin: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UserProfile;
