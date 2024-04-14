import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { Stepper, Step } from "react-form-stepper";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import CustomLoader from "./loader";
import { MdEdit } from "react-icons/md";
import {
  getProfileDetails,
  updateProfileDetails,
  getStoreDetails,
  updateStoreDetails,
  getVendorBankDetails,
  updateVendorBankDetails,
  getVendorDocumentDetails,
  updateVendorDocumentDetails
} from "../services/profile";

export default function ProfileManagement() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileDetails, setProfileDetails] = useState({});
  const [storeDetails, setStoreDetails] = useState({});
  const [vendorDocumentDetails, setVendorDocumentDetails] = useState({});
  const [vendorBankDetails, setVendorBankDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileInputs, setFileInputs] = useState({});

  const steps = ["Personal Details", "Store Details", "Documents", "Bank Details"];

  async function fetchData() {
    try {
      const [profileRes, storeRes, documentRes, bankRes] = await Promise.all([
        getProfileDetails(),
        getStoreDetails(),
        getVendorDocumentDetails(),
        getVendorBankDetails()
      ]);
      setProfileDetails(profileRes?.data?.vendor);
      setStoreDetails(storeRes?.data?.store_details);
      setVendorDocumentDetails(documentRes?.data?.store_documents);
      setVendorBankDetails(bankRes?.data?.bank_details);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch data: " + error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const validateForm = (details) => {
    const newErrors = {};
    Object.keys(details).forEach(key => {
      if (!details[key]) newErrors[key] = `${key.replace(/_/g, ' ')} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (validateForm({ name: profileDetails.name, email: profileDetails.email, phone: profileDetails.phone })) {
      setLoading(true);
      try {
        let response = await updateProfileDetails(profileDetails);
        if (response?.data?.success) {
          toast.success("Profile updated successfully!");
          fetchData();
        } else {
          toast.error("Failed to update profile: " + response?.data?.message);
        }
      } catch (error) {
        toast.error("Error updating profile");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateStoreDetails = async () => {
    if (validateForm(storeDetails)) {
      setLoading(true);
      try {
        let response = await updateStoreDetails({
          name: storeDetails.name,
          address_line_1: storeDetails.address_line_1,
          address_line_2: storeDetails.address_line_2,
          city: storeDetails.city,
          state: storeDetails.state,
          country: storeDetails.country,
          pincode: storeDetails.pincode
        });
                if (response?.data?.success) {
          toast.success("Store details updated successfully!");
          fetchData();
        } else {
          toast.error("Failed to update store details: " + response?.data?.message);
        }
      } catch (error) {
        toast.error("Error updating store details: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateDocumentDetails = async () => {
    if (validateForm(vendorDocumentDetails)) {
        setLoading(true);
        const formData = new FormData();
        Object.keys(fileInputs).forEach(key => {
            if (fileInputs[key] && fileInputs[key] !== vendorDocumentDetails[key]) {
                formData.append(key, fileInputs[key]);
            }
        });

        try {
            let response = await updateVendorDocumentDetails(formData);
            if (response?.data?.success) {
                toast.success("Document details updated successfully!");
                fetchData();
            } else {
                toast.error("Failed to update document details: " + response?.data?.message);
            }
        } catch (error) {
            toast.error("Error updating document details: " + error.message);
        } finally {
            setLoading(false);
        }
    }
};

  const handleUpdateBankDetails = async () => {
    if (validateForm(vendorBankDetails)) {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", vendorBankDetails.name);
        formData.append("account_number", vendorBankDetails.account_number);
        formData.append("routing_number", vendorBankDetails.routing_number);
        if (fileInputs.statement && fileInputs.statement !== vendorBankDetails.statement) {
            formData.append("statement", fileInputs.statement);
        }

        try {
            let response = await updateVendorBankDetails(formData);
            if (response?.data?.success) {
                toast.success("Bank details updated successfully!");
                fetchData();
            } else {
                toast.error("Failed to update bank details: " + response?.data?.message);
            }
        } catch (error) {
            toast.error("Error updating bank details: " + error.message);
        } finally {
            setLoading(false);
        }
    }
};


  const handleInputChange = (field, value) => {
    setProfileDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleStoreInputChange = (field, value) => {
    setStoreDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFileInputs(prev => ({ ...prev, [field]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVendorDocumentDetails(prev => ({ ...prev, [field]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <UserInput
              label="Full Name"
              placeholder="Vendor 1"
              value={profileDetails.name || ''}
              type="text"
              onChange={e => handleInputChange('name', e.target.value)}
              error={errors.name}
            />
            <UserInput
              label="Email"
              placeholder="vone@gmail.com"
              value={profileDetails.email || ''}
              type="text"
              onChange={e => handleInputChange('email', e.target.value)}
              error={errors.email}
            />
            <UserInput
              label="Phone Number"
              placeholder="1234567890"
              value={profileDetails.phone || ''}
              type="text"
              onChange={e => handleInputChange('phone', e.target.value)}
              error={errors.phone}
            />
            {storeDetails.passport_photo && (
              <div>
                <label>Passport Photo:</label>
                <img src={`https://thilaa.jethitech.com/storage/${storeDetails.passport_photo}`} alt="Passport" />
              </div>
            )}
            {storeDetails.front_photo && (
              <div>
                <label>Front Store Photo:</label>
                <img src={`https://thilaa.jethitech.com/storage/${storeDetails.front_photo}`} alt="Front Store" />
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="text-white bg-[#4B465C] px-4 py-2 rounded-md"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
            <PrimaryButton
              label="Next"
              action={() => setCurrentStep(1)}
              icon={<AiOutlineArrowRight />}
            />
          </>
        );
      case 1:
        return (
          <>
            <UserInput
              label="Store Full Name"
              placeholder="Green's Boutique"
              value={storeDetails.name || ''}
              type="text"
              onChange={e => handleStoreInputChange('name', e.target.value)}
              error={errors.name}
            />
            <UserInput
              label="Address Line 1"
              placeholder="Street 123"
              value={storeDetails.address_line_1 || ''}
              type="text"
              onChange={e => handleStoreInputChange('address_line_1', e.target.value)}
              error={errors.address_line_1}
            />
            <UserInput
              label="City"
              placeholder="City"
              value={storeDetails.city || ''}
              type="text"
              onChange={e => handleStoreInputChange('city', e.target.value)}
              error={errors.city}
            />
            <UserInput
              label="State"
              placeholder="State"
              value={storeDetails.state || ''}
              type="text"
              onChange={e => handleStoreInputChange('state', e.target.value)}
            />
            <UserInput
              label="Pincode"
              placeholder="Postal Code"
              value={storeDetails.pincode || ''}
              type="text"
              onChange={e => handleStoreInputChange('pincode', e.target.value)}
            />
            <UserInput
              label="Country"
              placeholder="Country"
              value={storeDetails.country || ''}
              type="text"
              onChange={e => handleStoreInputChange('country', e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="text-white bg-[#4B465C] px-4 py-2 rounded-md"
                onClick={handleUpdateStoreDetails}
              >
                Update Store Details
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <PrimaryButton
                label="Previous"
                action={() => setCurrentStep(0)}
                icon={<AiOutlineArrowLeft />}
              />
              <PrimaryButton
                label="Next"
                action={() => setCurrentStep(2)}
                icon={<AiOutlineArrowRight />}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
        {['driver_license', 'ein_certificate', 'state_tax_id', 'business_address_proof', 'address_proof'].map((field, index) => (
    <div key={index}>
        <label className='text-[1rem] font-[600] leading-[1.25rem]'>{field.replace(/_/g, ' ')?.toUpperCase()}</label>
        {vendorDocumentDetails[field] ? (
            <>
                <img
                    src={vendorDocumentDetails[field]}
                    // alt={field.replace(/_/g, ' ')}
                    className="w-[5rem] cursor-pointer"
                />
                <MdEdit onClick={() => document.getElementById(field).click()} />
                <input
                    type="file"
                    id={field}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(field, e.target.files[0])}
                />
                   <img
                    src={`https://thilaa.jethitech.com/storage/${vendorDocumentDetails[field]}`||`${vendorDocumentDetails[field]}`}
                    // alt={field.replace(/_/g, ' ')}
                    className="w-[5rem] cursor-pointer"
                />
            </>
        ) : (
            <>
                <p>No data</p>
                <input
                    type="file"
                    id={field}
                    onChange={(e) => handleFileChange(field, e.target.files[0])}
                />
            </>
        )}
    </div>
))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="text-white bg-[#4B465C] px-4 py-2 rounded-md"
                onClick={handleUpdateDocumentDetails}
              >
                Update Documents
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <PrimaryButton
                label="Previous"
                action={() => setCurrentStep(1)}
                icon={<AiOutlineArrowLeft />}
              />
              <PrimaryButton
                label="Next"
                action={() => setCurrentStep(3)}
                icon={<AiOutlineArrowRight />}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <UserInput
              label="Bank Name"
              type="text"
              placeholder="Enter Bank Name"
              value={vendorBankDetails.name || ''}
              onChange={(e) => setVendorBankDetails(prev => ({ ...prev, name: e.target.value }))}
            />
            <UserInput
              label="Account Number"
              type="text"
              placeholder="Enter Account Number"
              value={vendorBankDetails.account_number || ''}
              onChange={(e) => setVendorBankDetails(prev => ({ ...prev, account_number: e.target.value }))}
            />
            <UserInput
              label="IFSC Code"
              type="text"
              placeholder="Enter IFSC Code"
              value={vendorBankDetails.routing_number || ''}
              onChange={(e) => setVendorBankDetails(prev => ({ ...prev, routing_number: e.target.value }))}
            />
          <div>
    <label>Bank Statement</label>
    <input
        type="file"
        id="statement"
        onChange={(e) => handleFileChange('statement', e.target.files[0])}
    />
    {vendorBankDetails.statement && (
        <img
            src={`https://thilaa.jethitech.com/storage/${vendorBankDetails.statement}`}
            alt="Bank Statement"
            className="w-[5rem]"
        />
    )}
</div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="text-white bg-[#4B465C] px-4 py-2 rounded-md"
                onClick={handleUpdateBankDetails}
              >
                Update Bank Details
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <PrimaryButton
                label="Previous"
                action={() => setCurrentStep(2)}
                icon={<AiOutlineArrowLeft />}
              />
              <PrimaryButton
                label="Finish"
                action={() => {setCurrentStep(0)}}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  }


  return (
    <div className="flex flex-col gap-[2.19rem] bg-white p-[2rem] rounded-[1rem] pr-[40%] min-h-screen" >
      {loading && <CustomLoader />}
      <Stepper
        activeStep={currentStep}
        styleConfig={{ activeBgColor: "#BCE8B1", completedBgColor: "#89b78f" }}
      >
        {steps.map((label, index) => (
          <Step key={label} onClick={() => setCurrentStep(index)} />
        ))}
      </Stepper>
      {renderForm()}
    </div>
  );
}
