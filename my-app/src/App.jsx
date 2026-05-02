import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./page/Dashboard";
import Announcements from "./page/Announcements";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/announcement" element={<Announcements />} />
      </Routes>
    </BrowserRouter>
  );
}