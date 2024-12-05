import React from 'react'
import { AboutUsComponent, Breadcrumb, ChooseUs, FAQ } from '../components'

const About = () => {
  return (
    <>
    <Breadcrumb pageName={"About"}/>
    <ChooseUs/>
        <AboutUsComponent/>
        
        <FAQ/>
    </>
  )
}
export default About