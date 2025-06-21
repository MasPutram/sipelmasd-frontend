import { Navigate, Outlet } from "react-router-dom";

const UserProtect = ({ allowedRoles }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = auth?.token;
  const role = auth?.user?.role;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default UserProtect;
