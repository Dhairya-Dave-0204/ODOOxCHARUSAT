import React from 'react'
import { AboutShort, AboutValues } from '../../components/component_index'

function About() {
  return (
    <>
      <div className='mt-10 mb-20 text-4xl font-semibold text-center md:text-5xl'>
        <h1 className='underline underline-offset-8 decoration-primary'>About Us</h1>
      </div>

      <AboutShort />
      <AboutValues />
    </>
  )
}

export default About