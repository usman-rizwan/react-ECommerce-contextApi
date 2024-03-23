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
import AdminPage from "../pages/AdminPage";
import Chat from "../pages/Chat";
import AddProducts from "../pages/AddProducts";

const AppRouter = () => {
  const { login } = useContext(User);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            login.userStatus ? (
              login.user.email === "admin@gmail.com" ? (
                <Navigate to="/admin" />
              ) : (
                <Dashboard />
              )
            ) : (
              <Dashboard />
            )
          }
        />
        <Route
          path="/login"
          element={login.userStatus ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={login.userStatus ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/chat"
          element={login.userStatus ? <Chat/> : <LoginPage />}
        />
        <Route
          path="/admin"
          element={
            login.userStatus && login.user.email == "admin@gmail.com" ? (
              <AdminPage />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/add-products"
          element={
            login.userStatus && login.user.email == "admin@gmail.com" ? (
              <AddProducts />
            ) : (
              <PageNotFound />
            )
          }
        />
          <Route
          path="/orderstatus"
          element={
            login.userStatus ? (
              login.user.email === "admin@gmail.com" ? (
                <Navigate to="/admin" />
              ) : (
                <OrderDetails />
              )
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
            login.userStatus ? (
              login.user.email === "admin@gmail.com" ? (
                <Navigate to="/admin" />
              ) : (
                <CheckOutPage />
              )
            ) : (
              <EmptyCart
              class_name={"mt-20"}
              description={"No orders to delivered :("}
            />
            )
          }
        >
          <Route
            element={() => <h1 className="text-center text-4xl">Not Found</h1>}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
