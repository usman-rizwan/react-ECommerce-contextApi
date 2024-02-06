import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button ,NavbarMenuItem,NavbarMenuToggle,NavbarMenu} from "@nextui-org/react";
import { Link as RLink  , useSearchParams} from "react-router-dom";


export default function AppNavbar({status , logOut}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
// console.log(status)
  const navItems = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
    ]

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
        {navItems.map((v,i)=><NavbarItem className="capitalize cursor-pointer text-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:underline hover:text-blue-600 hover:font-bold"  key={i} onClick={()=>setSearchParams({categories:v})}> {v} </NavbarItem>)}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem >
            {status ? 
             <Button  className="text-tiny bg-red-600 text-white p-4" variant="shadow"  radius="full" size="sm" onClick={()=>logOut()} >
          Logout
             </Button>
:
          <RLink className="bg-blue-500 text-tiny px-4 py-2  text-white rounded-lg"  to={'/login'} >Login</RLink>
            }
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
          
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="cursor-pointer">
            <Link
            onClick={()=>setSearchParams({categories: item})}
              color={
                index === 2 ? "primary" : index === navItems.length - 1 ? "danger" : "foreground"
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
