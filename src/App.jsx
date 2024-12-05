import React from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  return (
    <>
      <Navbar/>
      <ScrollToTop/>
      <Outlet/>
      <Footer/> 
      <ToastContainer position='top-right'/>
    </>
  )
}

export default App