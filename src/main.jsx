import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {NextUIProvider} from '@nextui-org/react'
// import App from "./App";
// import "./index.css";
// import { FirebaseProvider, useFirebase } from "./contexts/firebase";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardP from "./pages/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <NextUIProvider>
    <App />
     </NextUIProvider>
  </React.StrictMode>
);
