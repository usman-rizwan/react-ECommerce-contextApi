
import React, { useContext } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import User from '../context';
import CartData from './CartData';
import {RollbackOutlined ,LogoutOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CheckOut = ({logOut}) => {
    const { login  } = useContext(User);
  return (
    <div>
    <Navbar shouldHideOnScroll className='bg-[#F4F4F5] poppins'>
      <NavbarBrand>
     
      <NavbarBrand>
          <p className="font-bold text-inherit md:text-center cursor-pointer">
            <span className="text-red-400 hover:text-blue-500">E-Com</span>
            <span className="text-blue-500 hover:text-red-400">merce</span>
          </p>
        </NavbarBrand>      
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
       <span className='font-mono font-semibold'>Check Out</span>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
      
        </NavbarItem>
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
            <DropdownItem key="home" className="h-10 gap-2" color="primary">
           <p><Link to={'/'}> <RollbackOutlined /> Back Home</Link></p>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>

    <CartData />
    </div>
  )
}

export default CheckOut
