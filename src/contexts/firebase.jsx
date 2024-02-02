import { createContext, useContext, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGtoSc9NjPetoeOlLmfIvkJeUrHnPKC0M",
  authDomain: "fir-auth-fd62a.firebaseapp.com",
  projectId: "fir-auth-fd62a",
  storageBucket: "fir-auth-fd62a.appspot.com",
  messagingSenderId: "58743354643",
  appId: "1:58743354643:web:22e2dda711927c9e0316e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext(null);
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth,
        user,
        setUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
