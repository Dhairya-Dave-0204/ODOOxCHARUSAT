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
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="p-4 text-center bg-blue-500 rounded-lg">
            <p className="text-xl font-bold">9</p>
            <p>Patients</p>
          </div>
          <div className="p-4 text-center bg-green-500 rounded-lg">
            <p className="text-xl font-bold">3</p>
            <p>Surgeries</p>
          </div>
          <div className="p-4 text-center bg-orange-500 rounded-lg">
            <p className="text-xl font-bold">2</p>
            <p>Discharges</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageAdmin