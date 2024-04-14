import React from 'react'
import { Outlet } from 'react-router-dom'
import mainImage from '../assets/images/rectangle.png'
export default function Root() {
  return (
    <div className='flex min-h-screen'>
        <img className='hidden sm:flex max-h-screen max-w-[50%] object-cover' src={mainImage} alt="Image" />
        <div className='flex justify-center items-center w-full'>
            <Outlet />
        </div>
    </div>
  )
}
