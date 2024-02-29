import React, { useCallback, useContext, useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import User from "../context";
import { auth, signOut } from "../db/index";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";
import CardSpacer from "../components/CardSpacer";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchData = useCallback(() => {
    axios("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const category = searchParams.get("categories");
    if (category && category !== "all") {
      axios(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    console.log(searchParams.get("categories"));
  }, [searchParams]);

  // console.log("products",products)

  const user = useContext(User);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User Logged out");
        message.success("User logged out successfully");
        user.setIsLogin(false);
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        message.error("An error occurred while logging out");
        // An error happened.
      });
  };
  return (
    <div>
      <AppNavbar status={user.login} logOut={logOut} />
      {loading ? <CardSpacer /> : <ProductCard list={products} />}
    </div>
  );
};

export default Dashboard;
