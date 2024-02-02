import { useEffect } from "react";
import "../App.css";
import { useFirebase } from "../contexts/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const RegisterPage = () => {
  const { app, auth, setUser } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;

    await createUserWithEmailAndPassword(auth, emailValue, passwordValue).then(res => console.log(res))

    
  };

  useEffect(() => {
    const a = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        console.log("User is signed out");
      }
    });
    return a
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default RegisterPage;
