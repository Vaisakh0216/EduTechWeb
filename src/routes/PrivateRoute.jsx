import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
