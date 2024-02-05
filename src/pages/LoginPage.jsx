import React, { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { auth, signInWithEmailAndPassword } from "../db/index";
import { message } from "antd";

const LoginPage = () => {
  
  let loginUser = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      message.success("User logged in successfully");
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message.success(errorMessage);
      console.log(errorMessage)
    });
  };
  return (
    <div>
      <LoginForm loginUser={loginUser} />
    </div>
  );
};

export default LoginPage;
