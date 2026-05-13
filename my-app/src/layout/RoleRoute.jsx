import { Navigate, Outlet } from "react-router-dom";

/**
 * @param {string[]} allowedRoles e.g. ["Admin"]
 */
export default function RoleRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
