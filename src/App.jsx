import React from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>
      <ScrollToTop/>
      <Outlet/>
      <Footer/> 
    </>
  )
}

export default App