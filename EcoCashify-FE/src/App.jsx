import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import NavBar from "./components/Navbar";

function App() {
  const location = useLocation();

  // List of paths where the NavBar should not be shown
  const hideNavBarRoutes = ["/auth/sign-in", "/auth/sign-up"];

  return (
    <>
      <ScrollRestoration />
      {/* Conditionally render NavBar */}
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Outlet />
    </>
  );
}

export default App;
