import React from 'react'
import OrderNavbar from '../components/OrderNavbar';
import { auth, signOut } from "../db/index";

import AdminData from '../components/AdminData';


const AdminPage = () => {
    const logOut = () => {
        signOut(auth)
          .then(() => {
            console.log("User Logged out");
            message.success("User logged out successfully");
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
        <OrderNavbar logOut={logOut} name={'Admin Page'} path={'chat'} pageName={"Chat"}  />
        <AdminData />
    </div>
  )
}

export default AdminPage
