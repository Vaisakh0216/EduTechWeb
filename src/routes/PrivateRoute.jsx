import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let isAuthenticated = localStorage.getItem("authToken"); // Replace this with actual authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render nested routes if authenticated
};

export default PrivateRoute;
