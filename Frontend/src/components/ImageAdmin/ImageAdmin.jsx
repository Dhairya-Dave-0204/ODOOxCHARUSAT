import React from 'react'
import assets from '../../assets/assets'

function ImageAdmin() {
  return (
    <>
         {/* Header Section */}
      <div className="flex flex-col items-center justify-between h-56 p-6 text-white bg-primary rounded-xl lg:flex-row">
        <div className='max-lg:text-center'>
          <h2 className="text-base font-medium md:text-xl">Admin Dashboard</h2>
          <h1 className="text-4xl font-bold md:text-5xl">Care Connect</h1>
          <p className='opacity-[75%] max-md:text-base'>All Stats at one place.</p>
        </div>

        <div className='flex items-center justify-center h-full max-w-full max-lg:hidden'>
          <img src={assets.admin_banner_photo} alt="" className='object-contain w-96 h-48 md:w-[400px] md:h-[220px]' />
        </div>
      </div>
    </>
  )
}

export default ImageAdmin