import { useEffect } from "react";
import "./App.css";
import { useFirebase } from "./contexts/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function App() {
  const { app, auth, user, setUser } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;

    await signInWithEmailAndPassword(auth, emailValue, passwordValue);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <>
      {user && JSON.stringify(user, null, 2)}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
      <Link to={'/dashboard'}>Dashboard</Link>
    </>
  );
}

export default App;
