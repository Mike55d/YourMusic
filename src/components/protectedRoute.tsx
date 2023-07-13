import { Navigate } from "react-router-dom";

type ProtectRouteProps = { children: JSX.Element };

const ProtectedRoute = ({ children }: ProtectRouteProps) => {
  const authStorage = JSON.parse(localStorage.getItem("auth") as string);

  if (!authStorage?.access_token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
