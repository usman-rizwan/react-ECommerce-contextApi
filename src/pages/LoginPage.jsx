import React, { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import { auth, signInWithEmailAndPassword } from "../db/index";
import { message } from "antd";
import LoadSpin from "../components/LoadSpin";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  let loginUser = ({ email, password }) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        message.success("User logged in successfully");
        console.log(user);
        setLoading(false);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(errorMessage);
        console.log(errorMessage);
        setLoading(false);
      });
  };
  return (
    <div>{loading ? <LoadSpin /> : <LoginForm loginUser={loginUser} />}</div>
  );
};

export default LoginPage;
