import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaXQa-qJHcadjo9xurcaas7l2vzTPmxTI",
  authDomain: "dj-app-6ecc5.firebaseapp.com",
  projectId: "dj-app-6ecc5",
  storageBucket: "dj-app-6ecc5.firebasestorage.app",
  messagingSenderId: "11142529692",
  appId: "1:11142529692:web:ce5b3039cdfb30a2dbe359",
  measurementId: "G-5RNKNQ2WWY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      {message && (
        <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <button
        onClick={handleResetPassword}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ffc107",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        Send Reset Email
      </button>
      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px",
          backgroundColor: "transparent",
          color: "#007bff",
          border: "none",
          cursor: "pointer",
          width: "100%",
          textDecoration: "underline",
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

export default ForgotPassword;
