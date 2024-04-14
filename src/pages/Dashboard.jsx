import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
      <div className='flex bg-[#DBDADE]'>
        <div className='flex w-fit'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-[1.5rem] w-full px-[2rem] py-[1rem]'>
          <Navbar />
          <Outlet />
          <p className='text-[#4B465C] text-[0.9375rem] font-[400] leading-[1.375rem] mx-auto mb-[1rem]'>Copyright 2024 - Company Name. All rights reserved. </p>
        </div>
      </div>
  )
}
