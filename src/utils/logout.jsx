import { message } from "antd";
import { auth, signOut } from "../db/index";

// Logout Function
const logout = () => {
 
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

export default logout;
