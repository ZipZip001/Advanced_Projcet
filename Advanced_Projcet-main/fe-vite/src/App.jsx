import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom"; // Chia Layout

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact/contact';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/index';
import RegisterPage from './pages/register';
import { fetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin/index'
import ProtectedRoute from './components/ProtectedRoute';

import LayoutAdmin from './components/Admin/LayoutAdmin';
import UserTable from './components/Admin/UserTable/UserTable';
const Layout = () => {
  return (
    <div className='layout-app'>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {
    if(window.location.pathname === '/login' )return;
   
    const res = await fetchAccount();
    if(res && res.data){
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(() =>{
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <NotFound />,
      children: [
        {index: true, element:<Home/>},
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "books",
          element: <ContactPage />,
        },

      ],
    },

    
    {
      path: "/admin",
      element:  
      <ProtectedRoute>        
        <LayoutAdmin/>
      </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        {index: true, element:
          <ProtectedRoute>    
            <AdminPage />
          </ProtectedRoute>
        },
        {
          path: "user",
          element: 
            
            <UserTable />,
        },
        {
          path: "books",
          element: <ContactPage />,
        },
        {
          path: "orders",
          element: <ContactPage />,
        },
      ],
    },


    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ]);

  return (
    <>
      {
        isLoading === false      
        || window.location.pathname === '/login' 
        || window.location.pathname === '/' 
        || window.location.pathname === '/register' 
        ?
        <RouterProvider router={router} /> 
        :
        <Loading/>
      } 
    </>
  )
}
