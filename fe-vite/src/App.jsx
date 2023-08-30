import React, { useState } from 'react';
import { Outlet } from "react-router-dom"; // Chia Layout

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact/contact';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import RegisterPage from './pages/register';


const Layout = () => {
  return (
    <div className='layout-app'>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <div>404 Cann't found the Page</div>,
    children: [
      {index: true, element:<Home/>},
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
  {
    path: "/admin/user",
    element: <RegisterPage/>,
  }
]);



export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
