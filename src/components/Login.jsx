import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Thilaa-Logo.svg';
import { vendorLogin } from "../services/register";
import { toast } from "react-toastify";
import CustomLoader from "./loader";
export default function Login() {

  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/dashboard')
    
  },[])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidEmail ? '' : 'Invalid email format',
      }));
    } else if (name === 'password') {
      const isValidPassword = value.length >= 6;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidPassword ? '' : 'Password must be at least 6 characters',
      }));
    }
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      }
    });
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Create payload and integrate API here
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await vendorLogin(payload);
      setLoading(false);
      if (response?.data?.success) {
        toast.success(response?.data?.message || 'Login successful');
        localStorage.setItem('vendor_details', JSON.stringify(response?.data?.vendor_details));
        localStorage.setItem('clover_integrated', response?.data?.clover_integrated);
        localStorage.setItem('token', response?.data?.token);
        window.location.reload();

        // navigate('/dashboard');
      } else {
        toast.error(response?.data?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      toast.error('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[2rem] max-w-[37.5625rem] w-full p-4">
      <img className="w-[4.6875rem] mb-[1rem] mx-auto" src={logo} alt="step" />
      <h1 className="text-text text-[2rem] font-[600]">Login</h1>
      <div className="flex flex-col gap-[1rem]">
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
          label="Password"
          ispassword={true}
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>
      <PrimaryButton label="Login" action={handleSubmit} />
      <div className="flex justify-center items-center gap-[0.5rem]">
        <p className="text-text text-[0.875rem] font-[400] leading-[1.375rem]">
          Don't have an account?
        </p>
        <Link
          to="/register-step-1"
          className="cursor-pointer text-text text-[1rem] font-[700] leading-[1.375rem]"
        >
          Register
        </Link>
      </div>
      {loading && <CustomLoader/>}
    </div>
  );
}
