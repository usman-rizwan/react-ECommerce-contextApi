import React, { useCallback, useContext, useEffect, useState } from "react";
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
import {
  db,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "../db/index";
import { Input } from "antd";
import User from "../context";
import EmptyCart from "./EmptyCart";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { m } from "framer-motion";
const ChatComponent = () => {
  const { login } = useContext(User);
  const curentUserId = login.user.uid;
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [currentChat, setCurrentChat] = useState({});
  const [userChats, setUserChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkUser, setCheckUser] = useState();
  const [filteredChats, setFilteredChats] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value] = useDebounce(messageInputValue, 1700);

  // Get all users from db
  const getAllUsers = async () => {
    let q;
    if (login.user.email === "admin@gmail.com") {
      q = query(collection(db, "users"), where("uid", "!=", curentUserId));
      setCheckUser(false);
    } else {
      q = query(
        collection(db, "users"),
        where("email", "==", "admin@gmail.com")
      );
      setCheckUser(true);
    }
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push({ id: doc.id, ...doc.data() });
      });
  
      login.user.email !== "admin@gmail.com" && setCurrentChat(allUsers[0]);
      setUserChats(allUsers);
    });
  
    
  };

  useEffect(() => {
    getAllUsers();
  }, []);

// Searcf users
  useEffect(() => {
    const filteredUsers = userChats.filter((v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filteredUsers);
  }, [userChats, searchQuery]);


  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);

  // Generating same user id for two users 
  const chatId = (curentId) => {
    let id = "";
    if (curentUserId < curentId) {
      id = `${curentUserId}${curentId}`;
    } else {
      id = `${curentId}${curentUserId}`;
    }
    // console.log("currentuser " , curentUserId)
    // console.log("curentId " , curentId)
    return id;
  };

  //  Send message function
  const sendMessage = async () => {
    setMessageInputValue("");
    if (!currentChat.id) return;
    const docRef = await addDoc(collection(db, "messages"), {
      message: messageInputValue.trim(),
      senderName: login.user.email.slice(0, login.user.email.indexOf("@")),
      sender: curentUserId,
      reciever: currentChat.id,
      recieverName: currentChat.name,
      timestamp: serverTimestamp(),
      chatId: chatId(currentChat.id),
    });
    console.log(currentChat.id);
    console.log(curentUserId);
    await updateDoc(doc(db, "users", currentChat.id), {
      [`lastMessages.${chatId(currentChat.id)}`]: {
        lastMessage: messageInputValue.trim(),
        timestamp: serverTimestamp(),
      },
    });
    await updateDoc(doc(db, "users", curentUserId), {
      [`lastMessages.${chatId(currentChat.id)}`]: {
        lastMessage: messageInputValue.trim(),
        timestamp: serverTimestamp(),
      },
    });
    console.log("Document written with ID: ", docRef.id);
  };
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);

  //  Getting All messages from db
  const getAllMessages = async () => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId(currentChat.id)),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
          direction:
            doc.data().sender === curentUserId ? "outgoing" : "incoming",
        });
      });
      setChatMessages(messages);
    });
  };



  
  const sendTyping = async (typing) => {

    const isTyping = currentChat?.isTyping?.[chatId(currentChat.uid)]?.[curentUserId];
    console.log("isTyping", isTyping)

    if (!isTyping && typing) {
        // console.log("api call")
        await updateDoc(doc(db, "users", currentChat.uid), {
            [`isTyping.${chatId(currentChat.uid)}.${curentUserId}`]: typing
        });
        await updateDoc(doc(db, "users",curentUserId), {
            [`isTyping.${chatId(currentChat.uid)}.${curentUserId}`]: typing
        });
    }
    if (!typing) {
        await updateDoc(doc(db, "users", currentChat.uid), {
            [`isTyping.${chatId(currentChat.uid)}.${curentUserId}`]: typing
        }); await updateDoc(doc(db, "users", curentUserId), {
            [`isTyping.${chatId(currentChat.uid)}.${curentUserId}`]: typing
        });
    }

}




  useEffect(() => {
    if (messageInputValue) {
      console.log("typing");
      sendTyping(true);
    }
    if (value === messageInputValue) {
      console.log("typing stopped");
      sendTyping(false);
    }
  }, [messageInputValue, value ]);

  useEffect(() => {
    if (currentChat?.id) {
      getAllMessages();
    }
  }, [currentChat]);

  
  const isTyping = currentChat?.isTyping?.[chatId(currentChat.id)]?.[currentChat.uid];
  return (
    <>
      <div
        style={{
          height: "90vh",
          position: "relative",
        }}
        className="container mt-3 mx-auto poppins"
      >
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false}>
            <Input
              disabled={checkUser}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#f6fbff] rounded-none placeholder:text-gray-900 poppins mb-2 py-3 "
            />
            <ConversationList>
              {filteredChats.length === 0 ? (
                <div className="flex justify-center items-center mt-2 font-light">
                  No user "{searchQuery.slice(0, 15)}" found!
                </div>
              ) : (
                filteredChats.map((v) => (
                  <Conversation
                    style={{
                      backgroundColor:
                        searchParams.get("chatId") === v.id ? "#a8ceec" : "",
                    }}
                    key={v.id}
                    name={v.name}
                    // info={v?.lastMessages?.[chatId(v.id)]?.lastMessage || ""}
                    info={
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            v?.lastMessages?.[chatId(v.id)]?.lastMessage || "",
                        }}
                        className="bg-transparent "
                      ></div>
                    }
                    onClick={() => {
                      handleConversationClick();
                      setCurrentChat(v);
                      searchParams.set("chatId", v.id);
                      navigate(`/chat?${searchParams}`);
                    }}
                    className="poppins"
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${v.name}`}
                    />
                    {/* {console.log("lastmessage",v?.lastMessages?.[chatId(v.id)])}
                    {console.log(v)} */}
                  </Conversation>
                ))
              )}
            </ConversationList>
          </Sidebar>

          {Object.keys(currentChat).length != 0 ? (
            <ChatContainer style={chatContainerStyle} className="poppins">
              <ConversationHeader className="poppins">
                <ConversationHeader.Back onClick={handleBackClick} />
                <Avatar
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${currentChat.name}`}
                />
                <ConversationHeader.Content
                  className="capitalize"
                  userName={currentChat.name}
                />
              </ConversationHeader>
              <MessageList
                typingIndicator={ isTyping ?
                  <TypingIndicator content={`Typing`} /> : false 
                }
              >
                {chatMessages.map((v, i) => (
                  <Message
                    key={i}
                    model={{
                      message: v.message,
                      direction: v.direction,
                    }}
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                       curentUserId === v.sender ? login.user.email :currentChat.name
                      }`}
                    />
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type a message"
                value={messageInputValue}
                onChange={(val) => setMessageInputValue(val)}
                onSend={sendMessage}
              />
            </ChatContainer>
          ) : (
            <div className="flex mx-auto justify-center items-center ">
              <EmptyCart
                class_name={"font-semibold"}
                description={`Interact the user with clear and concise information, maintaining a professional tone and addressing their concerns promptly. `}
                show={"none"}
              />
            </div>
          )}
        </MainContainer>
      </div>
    </>
  );
};

export default ChatComponent;
