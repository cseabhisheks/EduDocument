import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./page/Dashboard";
import Announcements from "./page/Announcements";
import DocumentsLibrary from "./page/DocumentsLibrary";
import UploadDocument from "./page/UploadDocumentContainer";
import AuthContainer from "./page/AuthContainer";
import ProtectedLayout from "./layout/ProtectedRoute";
import UploadAnnouncement from "./component/UploadAnnouncement";
export default function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<AuthContainer />} />

        {/* Protected group */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcement" element={<Announcements />} />
          <Route path="/document-library" element={<DocumentsLibrary />} />
          <Route path="/upload-document" element={<UploadDocument />} />
          <Route path="/upload-announcement" element={<UploadAnnouncement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}