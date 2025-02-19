import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notifications() {
  const showNotification = (type, message, position = "top-right") => {
    const options = {
      position,
      autoClose: 3000, // Closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored", // Styled toast
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warn(message, options);
        break;
      default:
        toast(message, options); // Default notification
        break;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>
      <button
        onClick={() => showNotification("success", "Operation was successful!")}
        style={{
          margin: "5px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        aria-label="Success Notification"
      >
        Show Success
      </button>
      <button
        onClick={() => showNotification("error", "Something went wrong!")}
        style={{
          margin: "5px",
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        aria-label="Error Notification"
      >
        Show Error
      </button>
      <button
        onClick={() => showNotification("info", "Here's some information!")}
        style={{
          margin: "5px",
          padding: "10px 20px",
          backgroundColor: "#17a2b8",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        aria-label="Info Notification"
      >
        Show Info
      </button>
      <button
        onClick={() => showNotification("warning", "This is a warning!")}
        style={{
          margin: "5px",
          padding: "10px 20px",
          backgroundColor: "#ffc107",
          color: "#212529",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        aria-label="Warning Notification"
      >
        Show Warning
      </button>
      <ToastContainer />
    </div>
  );
}

export default Notifications;
