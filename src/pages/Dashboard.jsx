import React, { useCallback, useContext, useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import User from "../context";;
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";
import CardSpacer from "../components/CardSpacer";
import { collection, getDocs, auth, signOut } from "../db/index";
import { db } from "../db/index";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();


  // Fetching all products

  const fetchData = useCallback(async () => {
    try {
      // Fetch products from Firestore
      const firestoreProducts = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        firestoreProducts.push(doc.data());
        // console.log(doc.data())
      });

      // Fetch products from the fake store API
      const fakeStoreProducts = await axios.get(
        "https://fakestoreapi.com/products"
      );

      // Merge products from both sources
      const mergedProducts = [...firestoreProducts, ...fakeStoreProducts.data];
      setProducts(mergedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetching products based on categories
  useEffect(() => {
    const category = searchParams.get("categories");
    setLoading(true)
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
    }else{
      fetchData()
    }
  }, [searchParams]);

  const user = useContext(User);


  // Logout function
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User Logged out");
        message.success("User logged out successfully");
        user.setIsLogin(false);
      })
      .catch((error) => {
        console.log(error);
        message.error("An error occurred while logging out");
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
