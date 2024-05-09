import React from "react";
import Navbar from "./Navbar";
import Elevel2 from "./Elevel2";
import English from "./English";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

export default function EnglishLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<English />} />
        <Route path="/Elevel2" element={<Elevel2 />} />
       
      </Routes>
    </div>
  );
}
