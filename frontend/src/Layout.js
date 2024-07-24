import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/admin/footer/Footer'
import Header from './components/admin/header/Header'
export default function Layout() {
  return (
    <>
    <Header/>
    
    <Outlet/>
    <Footer/>
    </>
  )
}
