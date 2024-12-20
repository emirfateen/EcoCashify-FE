import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import "./index.css"
import App from "./App"
import HomePage from "./pages/HomePage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ClaimPage from "./pages/ClaimPage.jsx"
import SuccessfulPage from "./pages/SuccessfulPage.jsx"
import PayPage from "./pages/PayPage.jsx"
import TransferPage from "./pages/TransferPage.jsx"
import CreateInvoicePage from "./pages/CreateInvoicePage.jsx"

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
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/claim-trash",
        element: <ClaimPage />,
      },
      {
        path: "/success/:message",
        element: <SuccessfulPage />,
      },
      {
        path: "/pay",
        element: <PayPage />,
      },
      {
        path: "/transfer",
        element: <TransferPage />,
      },
      {
        path: "/create-invoice",
        element: <CreateInvoicePage />,
      }
    ],
  },
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" />,
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
