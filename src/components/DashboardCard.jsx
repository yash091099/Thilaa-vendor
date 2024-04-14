import React from 'react'

export default function DashboardCard(props) {
  return (
    <div className='flex-1 flex gap-[0.5rem] px-[1rem] py-[1.5rem] border border-[#D5D5D5] rounded-[0.4375rem] shadow-md'>
        <img className="rounded-md" src={props.image} alt="img" />
        <div>
            <h1 className='text-[1.75rem] font-[600]'>{props.value}</h1>
            <p className='text-[1rem] font-[500]'>{props.label}</p>
        </div>
    </div>
  )
}
