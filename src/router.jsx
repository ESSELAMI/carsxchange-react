import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import MyCars from "./pages/MyCars.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myCars",
    element: <MyCars />,
  },
]);

export default router;
