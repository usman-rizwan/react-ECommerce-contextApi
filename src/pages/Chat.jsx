import React from 'react'
import OrderNavbar from '../components/OrderNavbar'
import ChatComponent from '../components/ChatUi'

const Chat = () => {
  return (
    <div>
    <OrderNavbar name={"Chat"}   />
   <ChatComponent/>
    </div>
  )
}

export default Chat
