import React from 'react'
import assets from '../../assets/assets'

function ListPracticeBanner({padding}) {
  return (
    <div className={`flex flex-col items-center gap-12 px-12 py-6 mb-24 xl:flex-row xl:px-${padding}`}>
        <div className='basis-1/2'>
            <img src={assets.practice} alt="Practice" />
        </div>
        
        <div className='basis-1/2'>
            <h3 className='text-base font-light opacity-70 md:text-base'>DocAppoint for private practices</h3>
            <h2 className='mb-3 text-2xl'>Are you a provider interested in reaching new patients?</h2>
            <ul className='mb-3 text-lg list-disc'>
                <li>Reach patients in your area looking for a new provider</li>
                <li>Fill last-minute openings in your schedule</li>
                <li>Strengthen your online reputation with verified reviews</li>
            </ul>
            <button className='px-5 py-3 font-medium text-white transition-all duration-500 bg-primary hover:scale-105 rounded-xl'>
              List your practice
            </button>
        </div>
    </div>
  )
}

export default ListPracticeBanner