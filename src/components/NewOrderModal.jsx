import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import SuccessImage from '../assets/svg/order-completed-icon.svg';
import LocationIcon from '../assets/svg/location-pin-dark.svg';
export default function NewOrderModal(props) {
    const [state, setState] = useState(1);
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0'>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[0.62rem] bg-white w-[69.125rem] p-[2.5rem] rounded-[1rem]'>
            {state === 3 && <div className='w-full flex flex-col justify-center items-center gap-[0.62rem]'>
                <img className="w-[3.625rem]" src={SuccessImage} alt="successfull" />
                <h1 className='text-[1.25rem] font-[600] tracking-[0.07813rem]'>Order Completed</h1>
            </div>}
            <div className='flex flex-col gap-[1.44rem]'>
                    <h1 className='text-[1.25rem] font-[600] tracking-[0.07813rem]'>New Order #157614075142992</h1>
                    <div className='flex gap-[0.62rem]'>
                        <img className='' src={LocationIcon} alt="location"/>
                        <h1 className='text-[1.25rem] font-[500] tracking-[0.07813rem]'>Business Center 1, M Floor, The Meydan Hotel,Jaipur, Rajasthan, 302034 </h1>
                    </div>
                    <h1 className='text-[1.25rem] font-[600] tracking-[0.07813rem]'>Order Details</h1>
                    <div className='flex flex-col gap-[0.69rem]'>
                        <div className='w-full flex flex-col gap-[0.44rem] pb-[0.69rem] border-b border-dashed border-black'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>1x &nbsp; &nbsp; Article 1</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 350.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>1x &nbsp; &nbsp; Article 2</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 350.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>1x &nbsp; &nbsp; Article 3</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 350.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>1x &nbsp; &nbsp; Article 4</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 350.00</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-[0.44rem] pb-[0.69rem] border-b border-dashed border-black'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Item Bill</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 1400.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Handling Free</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 5.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Delivery Free</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Free</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Discount</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 98.00</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-[0.44rem]'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Grand Total</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 1307.00</span>
                            </div>
                        </div>
                    </div>
            </div>
            {state === 1 &&  <div className='w-full flex justify-center gap-[0.62rem]'>
                    <button className='min-w-[10.625rem] flex justify-center items-center text-text text-[1rem] font-[600] leading-[1.5rem] bg-primary-brand p-[1rem] rounded-md' onClick={()=>{setState(2)}}>
                        Accept
                    </button>
                    <button className='min-w-[10.625rem] flex justify-center items-center text-text text-[1rem] font-[600] leading-[1.5rem] bg-[#EE5A66] p-[1rem] rounded-md' onClick={()=>{props.onClose(false)}}>
                        Reject
                    </button>
                </div>
            }
            {state === 2 && <div className='mt-[3.12rem]'>
                <h1 className='text-[1.25rem] font-[600] tracking-[0.07813rem]'>Enter OTP provided by Delivery partner</h1>
                <div className='py-[0.75] flex gap-[0.31rem]'>
                    <div className='w-fit bg-[#E5F6DF] p-[0.94rem] rounded-[0.25rem]'><input className='outline-none bg-[transparent] w-[0.62rem] text-[#656565] text-[1.25rem] font-[600] ' type="text" placeholder='_' /></div>
                    <div className='w-fit bg-[#E5F6DF] p-[0.94rem] rounded-[0.25rem]'><input className='outline-none bg-[transparent] w-[0.62rem] text-[#656565] text-[1.25rem] font-[600] ' type="text" placeholder='_' /></div>
                    <div className='w-fit bg-[#E5F6DF] p-[0.94rem] rounded-[0.25rem]'><input className='outline-none bg-[transparent] w-[0.62rem] text-[#656565] text-[1.25rem] font-[600] ' type="text" placeholder='_' /></div>
                    <div className='w-fit bg-[#E5F6DF] p-[0.94rem] rounded-[0.25rem]'><input className='outline-none bg-[transparent] w-[0.62rem] text-[#656565] text-[1.25rem] font-[600] ' type="text" placeholder='_' /></div>
                </div>
                <div className='w-fit mt-[2.4rem] mx-auto'>
                    <PrimaryButton label="Complete Order" action={()=>{setState(3)}} />
                </div>
            </div>}
        </div>
    </div>
  )
}
