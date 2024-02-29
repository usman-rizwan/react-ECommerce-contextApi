import React from 'react';
import OrderNavbar from '../components/OrderNavbar'
import ChatComponent from '../components/ChatUi'
import logout from '../utils/logout'

const Chat = () => {
  return (
    <div> 
    <OrderNavbar name={"Chat"}  logOut={logout}  />
   <ChatComponent/>
    </div>
  )
}

export default Chat;
