import { useEffect ,useContext, useState } from "react";
import "../App.css";
import { auth, createUserWithEmailAndPassword } from "../db/index";
import { message } from "antd";
import SignupForm from "../components/SignupForm";

const RegisterPage = () => {
  //   const { app, auth, setUser } = useFirebase();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const [email, password] = e.target.elements;
  //     const emailValue = email.value;
  //     const passwordValue = password.value;

  //     await createUserWithEmailAndPassword(auth, emailValue, passwordValue).then(res => console.log(res))

  //   };

  // useEffect(() => {
  //   const a = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user)
  //     } else {
  //       console.log("User is signed out");
  //     }
  //   });
  //   return a
  // }, []);

 
  let registerUser = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        message.success("User Register successfully");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  return (
  
    <>
      <SignupForm registerUser={registerUser} />
      {/* <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form> */}
    </>
  );
};

export default RegisterPage;
