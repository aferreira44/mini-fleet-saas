import { HashRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import VehiclesPage from "./pages/VehiclesPage";
import MainPage from "./pages/MainPage";
import React from "react";

const App = React.memo(function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
      </Routes>
    </Router>
  );
});

export default App;
