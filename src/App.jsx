import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Painel from "./components/Painel";

import "./css/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/painel" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;
