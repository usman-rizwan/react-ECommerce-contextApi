import React from "react";
import OrderNavbar from "../components/OrderNavbar";
import { auth, signOut } from "../db/index";
import { message } from "antd";
import OrderData from "../components/OrderData";
import MessageTag from "../components/MessageTag";

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
      <MessageTag/>
      <OrderData />
    </div>
  );
};

export default OrderDetails;
