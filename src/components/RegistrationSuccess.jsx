import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import finalImg from '../assets/steppings/final.svg';
import logo from '../assets/Thilaa-Logo.svg';


export default function RegistrationSuccess() {
  const navigate = useNavigate();
  useEffect(()=>{ setTimeout(()=>navigate('/'),5000)},[]);
  return (
    <div className="flex flex-col justify-between items-center max-w-[37.5625rem] h-full w-full p-12" onClick={()=>navigate('/')}>
      <div className="flex flex-col gap-[3rem]">
        <img className="w-[4.6875rem] mx-auto" src={logo} alt="step" />
        <h1 className="text-center text-text text-[2rem] font-[600]">Successfully Submitted</h1>
      </div>
        <img  className="max-w-[30.625rem]" src={finalImg} alt="successful" />
        <p className="text-center text-text text-[1.2rem] font-[500]">"Your profile is currently under review and will be processed shortly. Thank you for your patience."</p>
    </div>
  );
}
