import React from 'react';
import scannerImg from '../assets/svg/scanner-icon.svg';

export default function FieldInput({ label, boldLabel, value, onChange, scanner, disabled }) {
  return (
    <div className='flex-1 flex flex-col gap-[0.25rem]'>
      <p className={`text-[1rem] font-[600] ${boldLabel ? 'font-bold' : ''}`}>
        {label}
      </p>
      <div className='flex w-full justify-between items-center px-[0.88rem] py-[0.44rem] rounded-[0.375rem] border border-[#4B465C]/20'>
        <input disabled={disabled} className='outline-none w-full text-[#4B465C] text-[0.9375rem] font-[400] leading-[1.5rem]' type="text" value={value} onChange={onChange} placeholder={label} />
        {scanner && <img src={scannerImg} alt="scan" />}
      </div>
      {/* Add error message rendering if needed */}
    </div>
  );
}
