import React from 'react';
import CheckOut from '../components/CheckOut';
import {auth, signOut } from "../db/index";
import { message } from 'antd';


const CheckOutPage = () => {
  const logOut = ()=>{
    signOut(auth).then(() => {
      console.log("User Logged out")
      message.success("User logged out successfully");
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
      message.error("An error occurred while logging out");
      // An error happened.
    });
    }
  return (
    <div>
      <CheckOut  logOut={logOut}/>
    </div>
  )
}

export default CheckOutPage;
