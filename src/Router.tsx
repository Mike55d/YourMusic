import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "./features/Login/LoginContainer";
import Dashboard from "./features/Dashboard/Dashboard";
import ProtectedRoute from "./components/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginContainer />,
  },
  {
    path: "/home",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
  },
]);
