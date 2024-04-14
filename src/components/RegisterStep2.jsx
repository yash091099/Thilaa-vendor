import React, { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import step2 from '../assets/steppings/step2.svg';
import UserTextArea from "./UserTextArea";
import { useNavigate } from "react-router";
import { Country, State, City } from 'country-state-city';
import { registerVendorStore } from "../services/register";
import { toast } from "react-toastify";
import  CustomLoader  from "./loader";
import logo from '../assets/Thilaa-Logo.svg';
export default function RegisterStep2() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('vendor_details'))?.id;
  const name = JSON.parse(localStorage.getItem('vendor_details'))?.name;
const [loading, setLoading]=useState(false);
useEffect(() => {
  if(localStorage.getItem('token')) navigate('/dashboard')
  
},[])
  const [formData, setFormData] = useState({
    user_id: userId || '',
    name: name||'',
    passport_photo: null,
    address_line_1: '',
    address_line_2: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    front_photo: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    passport_photo: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    front_photo: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
    setCities(City.getAllCities());
    setStates(State.getAllStates());
    // console.log(Country.getAllCountries());
    // console.log(City.getAllCities());
    // console.log(State.getAllStates());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    const newValue =  value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    validateField(name, newValue);
  };

  const handleChangeFile = (name, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };
  

  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'name':
        errorMessage = value.trim() ? '' : 'Name is required';
        break;
        case 'passport_photo':
          if (!value) {
            errorMessage = 'Passport photo is required';
          } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(value.type)) {
              errorMessage = 'Invalid file type. Only JPEG, PNG, and JPG files are allowed.';
            }
          }
          break;
      case 'address_line_1':
        errorMessage = value.trim() ? '' : 'Address line 1 is required';
        break;
      case 'address_line_2':
        errorMessage = value.trim() ? '' : 'Address line 2 is required';
        break;
      case 'country':
        errorMessage = value ? '' : 'Country is required';
        break;
      case 'state':
        errorMessage = value ? '' : 'State is required';
        break;
      case 'city':
        errorMessage = value ? '' : 'City is required';
        break;
      case 'pincode':
        errorMessage = value ? '' : 'Pincode is required';
        break;
      case 'front_photo':
        errorMessage = value ? '' : 'Front photo is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
    return errorMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      const response = await createPayload();
      setLoading(false);
      if (response?.data?.success) {
        toast.success(response?.data?.message || 'Registration successful');
        localStorage.setItem('store_details', JSON.stringify(response?.data?.store_details));
        navigate('/register-step-3');
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    }
  };


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      const errorMessage = validateField(fieldName, value);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const createPayload = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) {
          payload.append(key, value);
        } else if (key === 'pincode') {
          payload.append(key, Number(value));
        } else {
          payload.append(key, value);
        }
      }
    });
    return await registerVendorStore(payload);
  };
  

  return (
    <div className="flex flex-col gap-[3rem] max-w-[37.5625rem] w-full p-4">
            <img className="w-[4.6875rem] mx-auto" src={logo} alt="step" />

      <img className="max-w-[33.625rem] w-full mx-auto" src={step2} alt="step" />
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-text text-[2rem] font-[600] mb-[1rem]">Store Information</h1>
        <UserTextArea
          label="Add Passport size photo"
          text="Photo"
          allowdFormats="acceptable formats: JPEG, JPG and PNG"
          name="passport_photo"
          value={formData.passport_photo}
          handleChangeFile={handleChangeFile}
          error={errors.passport_photo}
        />
        <div className='flex flex-col gap-[8px] w-full'>
          <label className='text-[1rem] font-[600] leading-[1.25rem]'>Address of your store</label>
          <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.address_line_1 ? 'border-red-500' : ''}`}>
            <input
              className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.address_line_1 ? 'text-red-500' : ''}`}
              type="text"
              placeholder="Address line 1"
              name="address_line_1"
              value={formData.address_line_1}
              onChange={handleChange}
            />
          </div>
          {/* {errors.address_line_1 && <span className="text-red-500 text-sm">{errors.address_line_1}</span>} */}
          <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.address_line_2 ? 'border-red-500' : ''}`}>
            <input
              className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.address_line_2 ? 'text-red-500' : ''}`}
              type="text"
              placeholder="Address line 2"
              name="address_line_2"
              value={formData.address_line_2}
              onChange={handleChange}
            />
          </div>
          {/* {errors.address_line_2 && <span className="text-red-500 text-sm">{errors.address_line_2}</span>} */}
          <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.country ? 'border-red-500' : ''}`}>
              <select
                className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.country ? 'text-red-500' : ''}`}
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>} */}
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.state ? 'border-red-500' : ''}`}>
              <select
                className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.state ? 'text-red-500' : ''}`}
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={!formData.country}
              >
                <option value="">State</option>
                {formData.country &&
                  states?.filter((state) => state.countryCode === countries.find((country) => country.name === formData.country).isoCode).map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>} */}
          </div>
          <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.city ? 'border-red-500' : ''}`}>
              <select
                className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.city ? 'text-red-500' : ''}`}
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
              >
                <option value="">City</option>
                {formData.state &&
                  cities?.filter((city) => city?.stateCode === states.find((state) => state.name === formData.state)?.isoCode).map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>} */}
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${errors.pincode ? 'border-red-500' : ''}`}>
              <input
                className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] ${errors.pincode ? 'text-red-500' : ''}`}
                type="text"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            {/* {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode}</span>} */}
          </div>
        </div>
        <UserTextArea
          label="Add Image of your store"
          text="Front facing photo of your store"
          allowdFormats="acceptable formats: JPEG, JPG and PNG"
          name="front_photo"
          value={formData.front_photo}
          handleChangeFile={handleChangeFile}
          error={errors.front_photo}
        />
      </div>
      <PrimaryButton label="Next" action={handleSubmit} />
      {loading&& <CustomLoader/>}
    </div>
  );
}