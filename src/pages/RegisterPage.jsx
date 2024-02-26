import { useEffect ,useContext, useState } from "react";
import "../App.css";
import { auth, createUserWithEmailAndPassword , db,
  doc, setDoc } from "../db/index";
import { message } from "antd";
import SignupForm from "../components/SignupForm";
import { Alert, Flex, Spin } from 'antd';

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

const [loading,setLoading] = useState(false)

  let registerUser = ({user_name ,email,phone_number,password}) => {
    setLoading(true)
    // console.log( user_name ,email,phone_number,password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed up
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: user_name  ,
         email:email,
         password:password,
         phone : phone_number,
         uid: user.uid,
        });

        message.success("User Register successfully");
        console.log(user);
        setLoading(false)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(`Error Code:${errorCode}   ${errorMessage}`);
        console.log(errorMessage);
        setLoading(false)

        // ..
      });
  };

  return (
  
    <>
    {loading ?     <Spin tip="Loading..." className="mt-20" >
      <Alert
        message="Wait a moment"
        description="Processing details ....."
        type="info"
      />
    </Spin> : <SignupForm registerUser={registerUser} />}
      {/* <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form> */}
    </>
  );
};

export default RegisterPage;
