import React, { useState, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge } from "@nextui-org/react";
import { Link as RLink, useSearchParams } from "react-router-dom";
import Cart from "../context/cart";
import CartDrawer from "./CartDrawer";
import { CarryOutOutlined } from "@ant-design/icons";
export default function AppNavbar({ status, logOut }) {
  const { cart } = useContext(Cart);
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(status)
  const navItems = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="poppins">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit md:text-center cursor-pointer">
            <span className="text-red-400 hover:text-blue-500">E-Com</span>
            <span className="text-blue-500 hover:text-red-400">merce</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((v, i) => (
          <NavbarItem
            className="capitalize cursor-pointer text-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:underline hover:text-blue-600 hover:font-bold"
            key={i}
            onClick={() => setSearchParams({ categories: v })}
          >
            {" "}
            {v}{" "}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Cart  */}
      {status.userStatus ? (
        <NavbarContent justify="end">
          <NavbarItem
            className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110
                  duration-300"
          >
            {" "}
            <Badge color="danger" content={cart.length} shape="circle">
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
                onClick={() => setOpen(true)}
              />
              <CartDrawer open={open} setOpen={setOpen} />
            </Badge>
          </NavbarItem>
        </NavbarContent>
      ) : null}

      {/* User Status */}
      <NavbarContent justify="end">
        <NavbarItem>
          {status.userStatus ? (
            //    <Button  className="text-tiny bg-red-600 text-white p-4" variant="shadow"  radius="full" size="sm" onClick={()=>logOut()} >
            // Logout
            //    </Button>
            <NavbarContent as="div" justify="end">
              <NavbarItem>
                {status.userStatus ? (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform "
                        color="primary"
                        size="sm"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{status.user.email}</p>
                      </DropdownItem>
                      <DropdownItem key="My orders" className="h-14 gap-2" color="primary">
                       <RLink to={'/orderstatus'}> <CarryOutOutlined /> My Orders
                       </RLink>
                      </DropdownItem>

                      <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={logOut}
                      >
                        <LogoutOutlined /> Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <RLink
                    className="bg-blue-500 text-tiny px-4 py-2 text-white rounded-lg"
                    to="/login"
                  >
                    Login
                  </RLink>
                )}
              </NavbarItem>
            </NavbarContent>
          ) : (
            <RLink
              className="bg-blue-500 text-tiny px-4 py-2  text-white rounded-lg"
              to={"/login"}
            >
              Login
            </RLink>
          )}
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
          
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className=" capitalize cursor-pointer"
          >
            <Link
              onClick={() => setSearchParams({ categories: item })}
              color={
                index === 2
                  ? "primary"
                  : index === navItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
