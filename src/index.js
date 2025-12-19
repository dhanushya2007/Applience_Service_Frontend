import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import BookingHistory from "./Pages/BookingHistory";
import About from "./Pages/About";
import AddAppliance from "./Pages/AddAppliance";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import SignUp from "./Pages/SignUp";

// Components
import ProtectedRoute from "./Components/ProtectedRoute";

// Context
// import { BookingProvider } from "./Common/BookingContext";
// import { AuthProvider } from "./context/AuthContext";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 🔓 PUBLIC LOGIN PAGE
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },


      // 🔒 PROTECTED PAGES (ALL YOUR EXISTING PAGES)
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "addAppliance",
        element: (
          <ProtectedRoute>
            <AddAppliance />
          </ProtectedRoute>
        ),
      },
      {
        path: "services/:id",
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookinghistory",
        element: (
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },

      // ❌ 404
      {
        path: "*",
        element: <h1>Page not found. Please check your URL.</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <BookingProvider> */}
        <RouterProvider router={routerVariables} />
      {/* </BookingProvider>
    </AuthProvider> */}
  </React.StrictMode>
);
