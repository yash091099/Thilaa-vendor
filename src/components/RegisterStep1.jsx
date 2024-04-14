import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import step1 from '../assets/steppings/step1.svg';
import logo from '../assets/Thilaa-Logo.svg';
import { registerVendor } from "../services/register";
import CustomLoader from './loader'
import { toast } from "react-toastify";
export default function RegisterStep1() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/dashboard')
    
  },[])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    agreeTerms: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    validateField(name, newValue);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'name':
        errorMessage = value.trim() ? '' : 'Name is required';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = emailRegex.test(value) ? '' : 'Invalid email address';
        break;
      case 'phoneNumber':
          const phoneNumberRegex = /^[0-9]{10}$/;
          errorMessage = phoneNumberRegex.test(value) ? '' : 'Invalid phone number';
          break;
      case 'password':
        const passwordRegex = /^.{6,}$/;
        errorMessage = passwordRegex.test(value) ? '' : 'Password must be at least 6 characters';
        break;
      case 'agreeTerms':
        errorMessage = value ? '' : 'You must agree to the terms and conditions';
        break;
      default:
        break;
    }
    console.log(errorMessage)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
    return errorMessage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      vendorRegistration();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      const errorMessage = validateField(fieldName, value);
      console.log(errorMessage,'error-message')
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const vendorRegistration =async () => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
      password_confirmation: formData.password,
    };
    console.log('Payload:', payload);
    const response = await registerVendor(payload);
    setLoading(false);
    if(response?.data?.success){
      toast.success(response?.data?.message||'Registration successful');
      localStorage.setItem('vendor_details',JSON.stringify(response?.data?.vendor_details))
      navigate('/register-step-2')
    }else{
      toast.error(response?.data?.message||'Registration failed');
    }
    console.log(response,'-----------------------response')

  };

  return (
    <div className="flex flex-col gap-[3rem] max-w-[37.5625rem] w-full p-4">
      <img className="w-[4.6875rem] mx-auto" src={logo} alt="step" />
      <img className="max-w-[33.625rem] w-full mx-auto" src={step1} alt="step" />
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-text text-[2rem] font-[600] mb-[1rem]">Register</h1>
        <UserInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <UserInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <UserInput
          label="Phone Number"
          type="text"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <UserInput
          label="Password"
          type="text"
          placeholder="********"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          ispassword={true}
        />
        <div className="flex gap-2 items-center">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="i1"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="i1" className="cursor-pointer text-text text-[0.75rem] font-[400] leading-[1.125rem]">
            I agree with Privacy Policy and Terms & Conditions
          </label>
        </div>
          {errors.agreeTerms && <span className="text-red-500 text-sm">{errors.agreeTerms}</span>}
      </div>
      <PrimaryButton label="Next" action={handleSubmit} />
      <div className="flex justify-center items-center gap-[0.5rem]">
        <p className="text-text text-[0.875rem] font-[400] leading-[1.375rem]">
          Already have an account?
        </p>
        <Link to="/" className="cursor-pointer text-text text-[1rem] font-[700] leading-[1.375rem]">
          Log in
        </Link>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}