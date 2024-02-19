import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import User from "../context";
import CartData from "./CartData";

import OrderNavbar from "./OrderNavbar";

const CheckOut = ({ logOut }) => {
  
  return (
    <div>
      <OrderNavbar logOut={logOut} name={"Check Out"} path={"orderstatus"} pageName={"Order Details"} />
      {<CartData />}
    </div>
  );
};

export default CheckOut;
