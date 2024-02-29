import React from 'react';
import CheckOut from '../components/CheckOut';
import logout from '../utils/logout';


const CheckOutPage = () => {

  return (
    <div>
      <CheckOut  logOut={logout}/>
    </div>
  )
}

export default CheckOutPage;
