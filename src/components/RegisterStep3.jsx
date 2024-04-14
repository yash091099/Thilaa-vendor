import React, { useState,useEffect } from "react";
import UserTextArea from "./UserTextArea";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import step3 from '../assets/steppings/step3.svg';
import { toast } from "react-toastify";
import  CustomLoader  from "./loader";
import { uploadStoreDocument } from "../services/register";
import logo from '../assets/Thilaa-Logo.svg';
export default function RegisterStep3() {
  const navigate = useNavigate();
  const user_id=JSON.parse(localStorage.getItem('vendor_details'))?.id
  const store_id=JSON.parse(localStorage.getItem('store_details'))?.id
const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    driver_license: null,
    ein_certificate: null,
    state_tax_id: null,
    address_proof: null,
    business_address_proof: null,
  });

  const [errors, setErrors] = useState({
    driver_license: '',
    ein_certificate: '',
    state_tax_id: '',
    address_proof: '',
    business_address_proof: '',
  });
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/dashboard')
    
  },[])
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

  const handleSubmit = async() => {
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
      // toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);

    // Create payload and integrate API here
    const payload = new FormData();
   await Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    payload.append('user_id', user_id);
    payload.append('store_id', store_id);

    const response=await uploadStoreDocument(payload);
    setLoading(false);
    if (response?.data?.success) {
      toast.success(response?.data?.message || 'Store Documents uploaded successfully');
      localStorage.setItem('store_details', JSON.stringify(response?.data?.store_details));
      localStorage.setItem('store_documents', JSON.stringify(response?.data?.store_documents));

      navigate('/register-step-4');

    }else{
      toast.error(response?.data?.message || 'Failed to upload store documents');
    }

  };

  return (
    <div className="flex flex-col gap-[3rem] max-w-[37.5625rem] w-full p-4">
      <img className="w-[4.6875rem] mx-auto" src={logo} alt="step" />
      <img className="max-w-[33.625rem] w-full mx-auto" src={step3} alt="step" />
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-text text-[2rem] font-[600] mb-[1rem]">Documents</h1>
        <UserTextArea
          label="Add image of your Driver License"
          text="Driver License"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="driver_license"
          value={formData.driver_license}
          handleChangeFile={handleChangeFile}
          error={errors.driver_license}
        />
        <UserTextArea
          label="Add image of your EIN certificate"
          text="EIN certificate"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="ein_certificate"
          value={formData.ein_certificate}
          handleChangeFile={handleChangeFile}
          error={errors.ein_certificate}
        />
        <UserTextArea
          label="Add image of your State Tax ID"
          text="State Tax ID"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="state_tax_id"
          value={formData.state_tax_id}
          handleChangeFile={handleChangeFile}
          error={errors.state_tax_id}
        />
        <UserTextArea
          label="Add image of your Address Proof"
          text="Address Proof"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="address_proof"
          value={formData.address_proof}
          handleChangeFile={handleChangeFile}
          error={errors.address_proof}
        />
        <UserTextArea
          label="Add image of your Business Address Proof"
          text="Business Address Proof"
          allowdFormats="acceptable formats: JPEG, JPG or PNG."
          name="business_address_proof"
          value={formData.business_address_proof}
          handleChangeFile={handleChangeFile}
          error={errors.business_address_proof}
        />
      </div>
      <PrimaryButton label="Next" action={handleSubmit} />
      {loading && <CustomLoader />}
    </div>
  );
}
