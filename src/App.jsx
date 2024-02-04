import React, { useState ,useEffect } from "react";
import AppRouter from "./config/Router";
import User from "./context";
import { auth, onAuthStateChanged } from "./db/index";


const App = () => {
    const [login , setIsLogin] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setIsLogin(true)
              // ...
            } else {
              // User is signed out
              // ..
              setIsLogin(false)
            }
          });
    }, [])
    
  return (
    <div>
      <User.Provider value={{login , setIsLogin}}>
        <AppRouter />
      </User.Provider>
    </div>
  );
};

export default App;
