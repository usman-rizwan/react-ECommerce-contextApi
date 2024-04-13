import React, { useContext } from "react";
import CartData from "./CartData";
import OrderNavbar from "./OrderNavbar";


const CheckOut = ({ logOut }) => {
  
  return (
    <div className="w-full">
      <OrderNavbar logOut={logOut} name={"Check Out"} path={"orderstatus"} pageName={"Order Details"} />
      {<CartData />}
    </div>
  );
};

export default CheckOut;
