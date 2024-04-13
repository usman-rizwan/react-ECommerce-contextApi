
import React ,{useContext} from 'react'
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
  import { RollbackOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ecommerceImage from "../../public/ecommerce.jpg";
import { UnorderedListOutlined  } from "@ant-design/icons";
import User from "../context";

const OrderNavbar = ({ logOut , name,path,pageName , addItems ,locate }) => {
    const { login } = useContext(User);
  return (
    <div>
      <Navbar shouldHideOnScroll className="bg-[#F4F4F5] poppins">
        <NavbarBrand>
          <NavbarBrand>
          <p className="font-bold text-inherit md:text-center cursor-pointer flex justify-center items-center gap-0">
            <span className="w-20">
              <img src={ecommerceImage} alt="" />
            </span>
            <span className="text-red-400 md:text-lg text-medium hover:text-blue-500">
              E-Com
            </span>
            <span className="text-blue-500 md:text-lg text-medium hover:text-red-400">
              merce
            </span>
          </p>
          </NavbarBrand>
        </NavbarBrand>
        <NavbarContent className=" sm:flex gap-4" justify="center">
          <NavbarItem className="capitalize cursor-pointer text-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:underline hover:text-blue-600 hover:font-bold font-semibold">
        {name}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex"></NavbarItem>
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{login.user.email}</p>
                </DropdownItem>
               {addItems && <DropdownItem key="home" className="h-10 gap-2" color="primary">
                  <p>
                    <Link to={`/${locate}`}>
                      {" "}
                      <RollbackOutlined /> {addItems}
                    </Link> 
                  </p>
                </DropdownItem> || <DropdownItem key="home" className="h-10 gap-2" color="primary">
                  <p>
                    <Link to={`/`}>
                      {" "}
                      <RollbackOutlined /> Back Home
                    </Link> 
                  </p>
                </DropdownItem> }
                { pageName &&
                <DropdownItem key="Order" className="h-10 gap-2" color="secondary">
                  <p >
                    <Link to={`/${path}`}>
                    <UnorderedListOutlined /> {pageName}
                    </Link>
                  </p>
                </DropdownItem>
                }
                <DropdownItem key="logout" color="danger" onClick={logOut}>
                  <LogoutOutlined /> Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default OrderNavbar
