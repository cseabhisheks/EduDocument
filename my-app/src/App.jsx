import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./page/Dashboard";
import Announcements from "./page/Announcements";
import DocumentsLibrary from "./page/DocumentsLibrary";
import UploadDocument from "./page/UploadDocumentContainer";
import AuthContainer from "./page/AuthContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/announcement" element={<Announcements />} />
        <Route path="/document-library" element={<DocumentsLibrary />} />
        <Route path="/upload-document" element={<UploadDocument />} />
      </Routes>
    </BrowserRouter>
  );
}