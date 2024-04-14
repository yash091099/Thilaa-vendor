import React from 'react';

export default function ReportCard({ label, value, children, darkHeading, onClick }) {
    return (
        <div className='bg-white p-[2rem] rounded-[1rem] w-full' onClick={onClick}>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-[0.12rem]'>
                    <p className={`text-[1.6rem] font-[700] ${darkHeading ? "" : "text-[#A5A5A5]"}`}>{label}</p>
                    <h1 className='text-primary-brand text-[1.5rem] font-[600]'>{value}</h1>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
