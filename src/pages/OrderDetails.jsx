import React from "react";
import OrderNavbar from "../components/OrderNavbar";
import logout from "../utils/logout";
import OrderData from "../components/OrderData";
import MessageTag from "../components/MessageTag";

const OrderDetails = () => {
  return (
    <div>
      <OrderNavbar logOut={logout} name={"Order"} path={"checkout"} pageName={"Checkout"} />
      <MessageTag/>
      <OrderData />
    </div>
  );
};

export default OrderDetails;
