// App.js
import React, { useState, useEffect } from "react";
import AppRouter from "./config/Router";
import User from "./context";
import Cart from "./context/cart";
import { auth, onAuthStateChanged } from "./db/index";
import LoadSpin from "./components/LoadSpin";

const App = () => {
  const [login, setIsLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        setIsLogin({ userStatus: true, user });
      } else {
        setIsLogin({ userStatus: false });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");
    const cartData = storedCartData ? JSON.parse(storedCartData) : [];
    setCart(cartData);
  }, [cart]);

  if (loading) {
    return <LoadSpin />;
  }

  return (
    <div>
      <User.Provider value={{ login, setIsLogin }}>
        <Cart.Provider value={{cart, setCart}}>
          <AppRouter />
        </Cart.Provider>
      </User.Provider>
    </div>
  );
};

export default App;
