import React from 'react'
import OrderNavbar from '../components/OrderNavbar';
import logout from '../utils/logout';
import AdminData from '../components/AdminData';


const AdminPage = () => {
  return (
    <div>
        <OrderNavbar logOut={logout} name={'Admin Page'} path={'chat'} pageName={"Chat"}  />
        <AdminData />
    </div>
  )
}

export default AdminPage
