import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "./features/Login/LoginContainer";
import Dashboard from "./features/Dashboard/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import ArtistDetail from "./features/ArtistDetail/ArtistDetail";
import MyAlbums from "./features/MyAlbums/MyAlbums";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginContainer />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/artist/:artistId",
    element: (
      <ProtectedRoute>
        <ArtistDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/myAlbums",
    element: (
      <ProtectedRoute>
        <MyAlbums />
      </ProtectedRoute>
    ),
  },
]);
