import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
    //   const isAuth =  true;
    const isAuth = localStorage.getItem("token");

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // renders child routes
}