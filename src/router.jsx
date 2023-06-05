import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

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

  //   children: [
  //     {
  //       path: "/",
  //       element: <Navigate to="/cars" />,
  //     },
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "/cars",
  //       element: <Cars />,
  //     },
  //     {
  //       path: "/myCars",
  //       element: <MyCars />,
  //     },
  //     {
  //       path: "/users/new",
  //       element: <UserForm key="userCreate" />,
  //     },
  //     {
  //       path: "/users/:id",
  //       element: <UserForm key="userUpdate" />,
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   element: <GuestLayout />,
  //   children: [
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/signup",
  //       element: <Signup />,
  //     },
  //   ],

  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default router;
