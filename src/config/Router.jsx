// AppRouter.js
import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import User from '../context';

const AppRouter = () => {
  const { login  } = useContext(User);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={login.userStatus ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/signup' element={login.userStatus ? <Navigate to='/' /> : <RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
