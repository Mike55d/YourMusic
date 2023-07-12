import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

type ProtectRouteProps = { children: JSX.Element };

const ProtectedRoute = ({ children }: ProtectRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
