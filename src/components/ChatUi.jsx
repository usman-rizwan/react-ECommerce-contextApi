import React, { useContext, useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Conversation,
  Avatar,
  ConversationList,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { db, collection, query, where, getDocs } from "../db/index";
import { Input } from "antd";
import User from "../context";
const ChatComponent = () => {
  const { login } = useContext(User);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [userChats, setUserChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  const getAllUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "!=", login.user.uid)
    );
    const querySnapshot = await getDocs(q);
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => user ", doc.data());
    });
    setUserChats(allUsers);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    const filteredUsers = userChats.filter((v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filteredUsers);
  }, [userChats, searchQuery]);

  return (
    <>
      <div
        style={{
          height: "90vh",
          position: "relative",
        }}
        className="container mt-3 mx-auto  "
      >
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false}>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#c6e3fa] "
            />
            <ConversationList>
              {filteredChats.length === 0 ? (
                <div>No user found</div>
              ) : (
                filteredChats.map((v) => (
                  <Conversation
                    key={v.id}
                    name={v.name}
                    lastSenderName="Lilly"
                    info="Yes, I can do it for you"
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${v.name}`}
                      name="Lilly"
                      status="available"
                    />
                  </Conversation>
                ))
              )}
            </ConversationList>
          </Sidebar>

          <ChatContainer style={chatContainerStyle}>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src="" name="Zoe" />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single",
                }}
              >
                <Avatar src="" name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last",
                }}
              >
                <Avatar src="" name="Zoe" />
              </Message>
            </MessageList>
            <MessageInput
              placeholder="Type a message"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={() => setMessageInputValue("")}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default ChatComponent;
