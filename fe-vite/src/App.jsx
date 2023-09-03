import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom"; // Chia Layout

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact/contact';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import RegisterPage from './pages/register';
import { fetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './components/admin/index'
import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

const LayoutAdmin = () => {
  return (
    <div className='layout-app'>
      {isAdminRoute && userRole === 'ADMIN' && <Header/>}
      {/* <Header/> */}
        <Outlet/>
      {/* <Footer/> */}
      {isAdminRoute && userRole === 'ADMIN' && <Footer/>}
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

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
      element: <Layout/>,
      errorElement: <NotFound />,
      children: [
        {index: true, element:
          <ProtectedRoute>    
            <AdminPage />
          </ProtectedRoute>
        },
        {
          path: "contacts",
          element: <ContactPage />,
        },
        {
          path: "books",
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
    // {
    //   path: "/admin/user",
    //   element: <RegisterPage/>,
    // }
  ]);

  return (
    <>
      {isAuthenticated === true      
      || window.location.pathname === '/login' 
      // || window.location.pathname === '/admin' 
      ?
      <RouterProvider router={router} /> 
      :
      <Loading/>
      } 
    </>
  )
}
