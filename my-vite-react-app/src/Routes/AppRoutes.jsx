import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Events from "../Pages/Events";
import EditProfile from "../Pages/EditProfile";
import Notifications from "../Pages/Notifications";
import Chat from "../Pages/Chat";
import AdminDashboard from "../Pages/AdminDashboard";
import ManageUsers from "../Pages/ManageUsers.jsx";
import ViewEvents from "../Pages/ViewEvents";
import ViewMessages from "../Pages/ViewMessages.jsx";
import Login from "../Pages/Login";
import UserProfile from "../Pages/UserProfile";
import SignUp from "../Pages/Signup";
import ForgotPassword from "../Pages/ForgotPassword";
import RunOfShow from "../Pages/RunOfShow";
import MessagesPage from "../Pages/MessagesPage.jsx";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Home {...props} />} />
      <Route path="/events" element={<Events />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/events" element={<ViewEvents />} />
      <Route path="/admin/messages" element={<ViewMessages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/run-of-show" element={<RunOfShow />} />
      <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  );
}

export default AppRoutes;
