import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./page/Dashboard";
import Announcements from "./page/Announcements";
import DocumentsLibrary from "./page/DocumentsLibrary";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/announcement" element={<Announcements />} />
        <Route path="/document-library" element={<DocumentsLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}