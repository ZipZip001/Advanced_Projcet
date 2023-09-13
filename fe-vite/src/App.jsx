import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom"; // Chia Layout

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//Component
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound/NotFound';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import UserTable from './components/Admin/UserTable/UserTable';
import Home from './components/home/index';
import ProtectedRoute from './pages/ProtectedRoute/RoleBaseRoute';

//pages
import LoginPage from './pages/Login';
import ContactPage from './pages/contact/contact';
import RegisterPage from './pages/Register';
import AdminPage from './pages/Admin/index'
import BookPage from './pages/Book';
import ViewOrder from './components/order/ViewOrder';

import { fetchAccount } from './services/api';

import { doGetAccountAction } from './redux/account/accountSlice';


import './styles/global.scss'
import Payment from './components/order/Payment';
import OrderPage from './pages/Order';



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
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element:
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>, 
        },
        {
          path: "payment",
          element: <Payment />,

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
        {index: true, element:<AdminPage />
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
