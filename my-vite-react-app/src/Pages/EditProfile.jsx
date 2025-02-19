import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    tiktok: "",
  });

  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    const savedBio = localStorage.getItem("bio");
    const savedLinks = JSON.parse(localStorage.getItem("socialLinks"));

    if (savedProfilePic) setProfilePic(savedProfilePic);
    if (savedBio) setBio(savedBio);
    if (savedLinks) setSocialLinks(savedLinks);
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
    localStorage.setItem("bio", event.target.value);
  };

  const handleLinkChange = (platform, value) => {
    const updatedLinks = { ...socialLinks, [platform]: value };
    setSocialLinks(updatedLinks);
    localStorage.setItem("socialLinks", JSON.stringify(updatedLinks));
  };

  const handleSaveProfile = () => {
    // Give some time for localStorage to update before navigating
    setTimeout(() => {
      navigate("/profile");
    }, 300);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Edit Profile</h2>

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
          <p>No Image</p>
        )}
      </div>

      {/* Upload Profile Picture Button */}
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePicChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <button
        onClick={() => document.getElementById("fileInput").click()}
        style={{
          padding: "8px 15px",
          borderRadius: "5px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        Upload Profile Picture
      </button>

      {/* Bio Section */}
      <textarea
        value={bio}
        onChange={handleBioChange}
        placeholder="Enter your bio..."
        rows="3"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          resize: "none",
          marginBottom: "15px",
        }}
      />

      {/* Social Links */}
      <h3>Social Links</h3>
      <input
        type="url"
        placeholder="Instagram URL"
        value={socialLinks.instagram}
        onChange={(e) => handleLinkChange("instagram", e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="url"
        placeholder="TikTok URL"
        value={socialLinks.tiktok}
        onChange={(e) => handleLinkChange("tiktok", e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Save Profile Button */}
      <button
        onClick={handleSaveProfile}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "5px",
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Profile
      </button>
    </div>
  );
}

export default EditProfile;
