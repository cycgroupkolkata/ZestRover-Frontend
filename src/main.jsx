import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './screens/Home.jsx'
import NotFound from './screens/NotFound.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/*' element={<NotFound/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
