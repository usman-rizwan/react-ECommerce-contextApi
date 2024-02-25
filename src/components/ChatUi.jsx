import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Sidebar,
    Search,
    Conversation,
    Avatar,
    ConversationList,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
    TypingIndicator,
    MessageSeparator,
    ExpansionPanel
} from "@chatscope/chat-ui-kit-react";
const ChatComponent = () => {
  return (
    <div style={{
      height: "90vh",
      position: "relative"
    }}>
                <MainContainer responsive>                                   
                  <Sidebar position="left" scrollable={false}>
                    <Search placeholder="Search..." />
                    <ConversationList>                                                     
                      <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src="" name="Lilly" status="available" />
                      </Conversation>
                      
                      <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                        <Avatar src="" name="Joe" status="dnd" />
                      </Conversation>
                      
                      <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                        <Avatar src="" name="Emily" status="available" />
                      </Conversation>
                      
                      <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                        <Avatar src="" name="Kai" status="unavailable" />
                      </Conversation>
                                  
                     
                                                                               
                    </ConversationList>
                  </Sidebar>
                    
                  <ChatContainer>
                    <ConversationHeader>
                      <ConversationHeader.Back />
                      <Avatar src="" name="Zoe" />
                      <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
                      <ConversationHeader.Actions>
                        <VoiceCallButton />
                        <VideoCallButton />
                        <InfoButton />
                      </ConversationHeader.Actions>          
                    </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                      
                      <MessageSeparator content="Saturday, 30 November 2019" />
                      
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
                        <Avatar src="" name="Zoe" />
                      </Message>
                      
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "single"
            }} avatarSpacer />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first"
            }} avatarSpacer />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal"
            }} avatarSpacer />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal"
            }} avatarSpacer />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last"
            }}>
                        <Avatar src="" name="Zoe" />
                      </Message>
                      
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "first"
            }} />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal"
            }} />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal"
            }} />
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "last"
            }} />
                      
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first"
            }} avatarSpacer />                                          
                      <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last"
            }}>
                        <Avatar src="" name="Zoe" />
                      </Message>
                    </MessageList>
                    <MessageInput placeholder="Type message here" value={"ffg"} onChange={val => setMessageInputValue(val)} onSend={() => setMessageInputValue("")} />
                  </ChatContainer>
                  
                 
                </MainContainer>
              </div>
  );
};

export default ChatComponent;