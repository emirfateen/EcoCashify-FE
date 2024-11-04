import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import "./index.css"
import App from "./App"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"
import ScanPage from "./pages/ScanPage"
import ClaimPage from "./pages/ClaimPage"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/collector/scan-trash",
        element: <ScanPage />,
      },
      {
        path: "/claim-trash",
        element: <ClaimPage/>,
      }
    ],
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
}
