import React from "react";
import OrderNavbar from "../components/OrderNavbar";
import { auth, signOut } from "../db/index";
import { message } from "antd";
import OrderData from "../components/OrderData";

const OrderDetails = () => {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User Logged out");
        message.success("User logged out successfully");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        message.error("An error occurred while logging out");
        // An error happened.
      });
  };
  return (
    <div>
      <OrderNavbar logOut={logOut} name={"Order"} path={"checkout"} pageName={"Checkout"} />
      <OrderData />
    </div>
  );
};

export default OrderDetails;
