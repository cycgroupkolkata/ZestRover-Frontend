import React from 'react'
import { AboutUsComponent, Breadcrumb, ChooseUs, FAQ } from '../components'

const About = () => {
  return (
    <>
    <Breadcrumb pageName={"About"}/>
        <AboutUsComponent/>
        <ChooseUs/>
        <FAQ/>
    </>
  )
}

export default About