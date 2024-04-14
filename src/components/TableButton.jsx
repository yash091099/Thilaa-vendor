import React from 'react'

export default function TableButton(props) {

  return (
    <button className={`text-[#4B465C] text-[1.17188rem] font-[400] leading-[1.71875rem] px-[0.78rem] py-[0.31rem] rounded-[0.46875rem] hover:bg-[#4B465C]/20 ${props.activeButton == props.label ? 'bg-[#BCE8B1]':'bg-[#4B465C]/10'}`} onClick={props.action}>
        {props.label}
    </button>
  )
}
