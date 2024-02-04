import React  ,{ useCallback, useContext, useEffect, useState}from "react";
import AppNavbar   from "../components/Navbar";
import User from '../context' 
import {auth, signOut } from "../db/index";
import ProductCard from "../components/ProductCard";
import axios from "axios";


const Dashboard = () => {
  const [products ,setProducts]  = useState([])
  const fetchData = useCallback(() => {
    axios('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log("products",products)
  const user = useContext(User)

  const logOut = ()=>{
  signOut(auth).then(() => {
    console.log("User Logged out")
    user.setIsLogin(false)
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
  }
  return (
  <div>
    <AppNavbar  status={user.login}  logOut={logOut}/>
  <ProductCard list={products} />
  </div>
    )
};

export default Dashboard;
