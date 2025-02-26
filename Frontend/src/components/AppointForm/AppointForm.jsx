import React from 'react'
import assets from '../../assets/assets'

function AppointForm() {
  return (
    <div className='flex flex-col items-center justify-center gap-10 px-12 py-6 mb-20 xl:px-60 lg:flex-row'>
        <div className='shadow-2xl rounded-3xl max-lg:hidden basis-1/2'>
            <img src={assets.appointment_form} alt="" className='rounded-3xl'/>
        </div>
        
        <div className='p-8 shadow-2xl rounded-3xl md:p-14 lg:basis-1/2'>
            <h4 className='text-sm font-medium text-primary md:text-lg'>Appointments</h4>
            <h2 className='mb-3 text-2xl md:mb-10 md:text-5xl'>Book your appointment</h2>
            <form action="#" className=''>
                <div className='flex flex-col gap-2 mb-3'>
                    <label htmlFor="fullname" className='max-sm:text-sm'>Full Name</label>
                    <input type="text" name="fullname" id="fullname" className='h-10 border border-gray-600 rounded-lg'/>
                </div>
                
                <div className='flex flex-col gap-2 mb-3'>
                    <label htmlFor="number" className='max-sm:text-sm'>Number</label>
                    <input type="tel" name="number" id="number" className='h-10 border border-gray-600 rounded-lg'/>
                </div>
                
                <div className='flex flex-col gap-2 mb-3'>
                    <label htmlFor="mail" className='max-sm:text-sm'>E-mail</label>
                    <input type="email" name="mail" id="mail" className='h-10 border border-gray-600 rounded-lg'/>
                </div>
                
                <div className='flex flex-col gap-2 mb-3'>
                    <label htmlFor="date" className='max-sm:text-sm'>Date of appointment</label>
                    <input type="date" name="date" id="date" className='h-10 px-3 border border-gray-600 rounded-lg'/>
                </div>
                
                <div className='flex flex-col gap-2 mb-3'>
                    <label htmlFor="time" className='max-sm:text-sm'>Time of appointment</label>
                    <input type="time" name="time" id="time" className='h-10 px-3 border border-gray-600 rounded-lg'/>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <label htmlFor="message" className='max-sm:text-sm'>Additional instructions</label>
                    <textarea name="message" id="message" className='border border-gray-600 rounded-lg h-28'/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AppointForm