import React from "react";
import { createRoot } from "react-dom/client";

import App from "./routes/App";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
