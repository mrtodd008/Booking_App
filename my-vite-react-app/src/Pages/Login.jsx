import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect after login (adjust as needed)
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
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
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/forgot-password")}
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
        Forgot Password?
      </button>
    </div>
  );
}

export default Login;
