import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button ,NavbarMenuItem,NavbarMenuToggle,NavbarMenu} from "@nextui-org/react";
import { Link as RLink } from "react-router-dom";

export default function AppNavbar({status , logOut}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
console.log(status)
  const menuItems = [
    "Jewellwery",
    
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand >
         
          <p className="font-bold text-inherit md:text-center ">E-Commerce</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem >
            {status ? 
             <Button className="bg-red-500 text-white" onClick={()=>logOut()} >
          Logout
             </Button>
:
          <RLink className="bg-blue-500 p-2 text-white rounded"  to={'/login'} >Login</RLink>
            }
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
          
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
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
