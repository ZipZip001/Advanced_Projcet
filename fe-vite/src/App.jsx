import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom"; 

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//Component
import Header from './components/Header/header';
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
// import Payment from './components/order/Payment';
import OrderPage from './pages/Order';
import HistoryPage from './pages/History';
import BookTable from './components/Admin/BookTable/BookTable';
import OutSideBook from './components/Book/OutSideBook';




const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='layout-app'>
      <Header searchTerm = {searchTerm}  setSearchTerm = {setSearchTerm}/>
        <Outlet context={[searchTerm, setSearchTerm]}/>
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
          path: "history",
          element: <HistoryPage/>,
        },
        {
          path: "outcheck",
          element: <OutSideBook/>,
        },
        

      ],
    },

    
    {
      path: "/admin",
      element:            <LayoutAdmin/>,
        // <ProtectedRoute>        
        //   <LayoutAdmin/>
        // </ProtectedRoute>,
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
          path: "book",
          element: <BookTable />,
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
        || window.location.pathname === '/outcheck'
        || window.location.pathname === '/admin'  

        ?
        <RouterProvider router={router} /> 
        :
        <Loading/>
      } 
    </>
  )
}
