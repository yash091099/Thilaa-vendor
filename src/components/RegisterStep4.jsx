import React, { useState,useEffect } from "react";
import UserInput from "./UserInput";
import UserTextArea from "./UserTextArea";
import PrimaryButton from "./PrimaryButton";
import logo from '../assets/Thilaa-Logo.svg';
import step4 from '../assets/steppings/step4.svg';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { uploadStoreBankDetails } from "../services/register";
import  CustomLoader  from "./loader";

export default function RegisterStep4() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user_id=JSON.parse(localStorage.getItem('vendor_details'))?.id;
  const store_id=JSON.parse(localStorage.getItem('store_details'))?.id;

  const [formData, setFormData] = useState({
    name: '',
    account_number: '',
    routing_number: '',
    statement: null,
  });
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/dashboard')
    
  },[])
  const [errors, setErrors] = useState({
    name: '',
    account_number: '',
    routing_number: '',
    statement: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === 'account_number' || name === 'routing_number') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value && !isNaN(value) ? '' : `${name.replace('_', ' ')} must be a number`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? '' : `${name.replace('_', ' ')} is required`,
      }));
    }
  };

  const handleChangeFile = (name, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: file ? '' : `${name.replace('_', ' ')} is required`,
    }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
        isValid = false;
      }
    });
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Create payload and integrate API here
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'statement' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });
    payload.append('user_id', user_id);
    payload.append('store_id', store_id);
    const response = await uploadStoreBankDetails(payload);
    setLoading(false);
    if (response?.data?.success) {
      toast.success(response?.data?.message || 'Bank Details uploaded successfully');
      localStorage.setItem('store_details', JSON.stringify(response?.data?.store_details));
      navigate('/final');
    } else {
      toast.error(response?.data?.message || 'Failed to upload bank details. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-[3rem] max-w-[37.5625rem] w-full p-4">
      <img className="w-[4.6875rem] mx-auto" src={logo} alt="step" />
      <img className="max-w-[33.625rem] w-full mx-auto" src={step4} alt="step" />
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-text text-[2rem] font-[600] mb-[1rem] ">Bank Details</h1>
        <UserInput
          label="Bank Name"
          type="text"
          placeholder="Enter Bank Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <UserInput
          label="Account Number"
          type="text"
          placeholder="Enter Account Number"
          name="account_number"
          value={formData.account_number}
          onChange={handleChange}
          error={errors.account_number}
        />
        <UserInput
          label="Routing Number"
          type="text"
          placeholder="Enter Routing Number"
          name="routing_number"
          value={formData.routing_number}
          onChange={handleChange}
          error={errors.routing_number}
        />
        <UserTextArea
          label="Bank Statement/ Void cheque"
          text="Bank Statement/ Void cheque"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="statement"
          value={formData.statement}
          handleChangeFile={handleChangeFile}
          error={errors.statement}
        />
      </div>
      <PrimaryButton label="Submit" action={handleSubmit} />
      {loading && <CustomLoader />}
    </div>
  );
}
