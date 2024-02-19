// AppRouter.js
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import User from "../context";
import CheckOutPage from "../pages/CheckOutPage";
import EmptyCart from "../components/EmptyCart";
import PageNotFound from "../components/PageNotFound";
import OrderDetails from "../pages/OrderDetails";

const AppRouter = () => {
  const { login } = useContext(User);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={login.userStatus ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={login.userStatus ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/orderstatus"
          element={
            login.userStatus  ? (
              <OrderDetails />
            ) : (
              <EmptyCart
                class_name={"mt-20"}
                description={"No orders to delivered :("}
              />
            )
          }
       />
        <Route
          path="/checkout"
          element={
            login.userStatus  ? (
              <CheckOutPage />
            ) : (
              <EmptyCart
                class_name={"mt-20"}
                description={"No items for checkout..."}
              />
            )
          }
        >
          <Route
            element={() => <h1 className="text-center text-4xl">Not Found</h1>}
          />
        </Route>
          <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
