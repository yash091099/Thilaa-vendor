import React from 'react';

export default function PrimaryButton({ label, action }) {
  return (
    <button className='flex m-2 justify-center items-center text-text text-[1rem] font-[600] leading-[1.5rem] bg-primary-brand w-full p-[1rem] rounded-md' onClick={action}>
      {label}
    </button>
  );
}
