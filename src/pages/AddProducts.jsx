import React from 'react'
import OrderNavbar from '../components/OrderNavbar';
import logout from '../utils/logout';
import AddItems from '../components/AddItems';


const AddProducts = () => {
  return (
    <div>
        <OrderNavbar logOut={logout} name={'Add Products'} path={'addproducts'} pageName={"Chat"}  />
        <AddItems />
    </div>
  )
}

export default AddProducts
