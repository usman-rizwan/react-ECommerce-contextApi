import React from "react";
import { useFirebase } from "../contexts/firebase";

const Dashboard = () => {
  const { user } = useFirebase();
  console.log(user)
  return <div>Dashboard</div>;
};

export default Dashboard;
