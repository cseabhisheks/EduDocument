import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./page/Dashboard";
import Announcements from "./page/Announcements";
import DocumentsLibrary, {
  DocumentLibraryRedirect,
} from "./page/DocumentsLibrary";
import UploadDocument from "./page/UploadDocumentContainer";
import AuthContainer from "./page/AuthContainer";
import ProtectedLayout from "./layout/ProtectedRoute";
import RoleRoute from "./layout/RoleRoute";
import UploadAnnouncement from "./component/UploadAnnouncement";
import AdminUsers from "./page/AdminUsers";
import FacultyStudents from "./page/FacultyStudents";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<AuthContainer />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcement" element={<Announcements />} />
          <Route path="/notes" element={<DocumentsLibrary mode="notes" />} />
          <Route
            path="/assignments"
            element={<DocumentsLibrary mode="assignmentHub" />}
          />
          <Route
            path="/document-library"
            element={<DocumentLibraryRedirect />}
          />
          <Route path="/upload-document" element={<UploadDocument />} />
          <Route path="/upload-announcement" element={<UploadAnnouncement />} />

          <Route element={<RoleRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<AdminUsers />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={["Admin", "Faculty"]} />}>
            <Route path="/faculty/students" element={<FacultyStudents />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}