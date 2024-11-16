import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import "./index.css"
import App from "./App"
//import HomePage from "./pages/HomePage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ClaimPage from "./pages/ClaimPage.jsx"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
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
      // {
      //   path: "/collector/scan-trash",
      //   element: <ScanPage />,
      // },
      {
        path: "/claim-trash",
        element: <ClaimPage />,
      }
    ],
  },
  // {
  //   path: "/",
  //   element: <Navigate to="/home" />,
  // },
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
