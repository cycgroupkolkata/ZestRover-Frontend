import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { About, Blogs, BlogsPage, BookingPage, Career, Contact, Enquiry, FlightBookingReviewPage, FlightSearch, Home, HotelDetailsPage, HotelSearch, ImageGalary, Loading, Login, NotFound, Offers, Service, Services, Signup, TourPackage } from './screens/index.js'
import { TourPackageForm } from './components/index.js'
import BlogForm from './components/Forms/BlogForm.jsx'
import FlightBookingPage from './screens/FlightBookingPage.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/offers' element={<Offers/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/enquiry' element={<Enquiry/>}/>
      <Route path='/*' element={<NotFound/>} />
      <Route path='/package/:slug' element={<TourPackage/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/service/:category' element={<Services/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/blogs/:slug' element={<BlogsPage/>}/>
      <Route path='/add-tour-package' element={<TourPackageForm/>}/>
      <Route path='/add-blog' element={<BlogForm/>}/>
      <Route path='/flight-search' element={<FlightSearch/>}/>
      <Route path='/flight-booking' element={<FlightBookingPage/>}/>
      <Route path='/hotel-search' element={<HotelSearch/>}/>
      <Route path='/hotel-details' element={<HotelDetailsPage/>}/>
      <Route path='/hotel-booking' element={<BookingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/career' element={<Career/>}/>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/flight-details-review' element={<FlightBookingReviewPage/>}/>
      <Route path={'/image-galary'} element={<ImageGalary/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
