import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider toastOptions={{ defaultOptions: { position: "bottom" } }}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
