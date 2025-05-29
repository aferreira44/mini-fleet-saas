import { HashRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import VehiclesPage from "./pages/VehiclesPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
