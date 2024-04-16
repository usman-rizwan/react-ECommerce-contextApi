import React from 'react'
import OrderNavbar from '../components/OrderNavbar';
import logout from '../utils/logout';
import AdminTabs from '../components/AdminTabs';


const AddProducts = () => {
  return (
    <div>
        <OrderNavbar logOut={logout} name={'Add Products'} path={'addproducts'} pageName={"Chat"}  />
        <AdminTabs />
    </div>
  )
}

export default AddProducts
