import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./componenets/Layout/index.tsx";
import { AddUser } from "./componenets/AddUser/index.tsx";
import { UserList } from "./componenets/UserList/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/add", element: <AddUser /> },
      { path: "/users/:id", element: <AddUser /> },
      { path: "/users", element: <UserList /> },
      { path: "*", element: <UserList /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
