import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Components/NavBar";
import BottomNav from "./Components/BottomNavigation";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <BottomNav />
    </>
  );
}

export default App;
