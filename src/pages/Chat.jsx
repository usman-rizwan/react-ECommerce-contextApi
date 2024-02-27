import React from 'react'
import OrderNavbar from '../components/OrderNavbar'
import ChatComponent from '../components/ChatUi'
import {auth, signOut } from "../db/index";

const Chat = () => {
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
    <OrderNavbar name={"Chat"}  logOut={logOut}  />
   <ChatComponent/>
    </div>
  )
}

export default Chat
