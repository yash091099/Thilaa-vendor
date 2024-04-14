import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { registerCloverAccount, getCloverKeys, updateCloverKeys, syncProductsWithClover } from "../services/clover";
import { toast } from "react-toastify";
import CustomLoader from "./loader";

export default function LinkClover() {
  const [merchantId, setMerchantId] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [errors, setErrors] = useState({ merchantId: "", apiToken: "" });
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false); // Additional loading state for syncing
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCloverKeys().then((response) => {
      setLoading(false);
      if (response?.data?.success) {
        if (response?.data?.store?.clover_mid && response?.data?.store?.clover_api_token) {
          setEditMode(true);
          setMerchantId(response?.data?.store?.clover_mid);
          setApiToken(response?.data?.store?.clover_api_token);
        }
      } else {
        toast.error("Failed to fetch Clover keys");
      }
    });
  }, []);

  const handleSubmit = async () => {
    let tempErrors = { ...errors };
    tempErrors.merchantId = merchantId?.trim() ? "" : "Merchant ID is required";
    tempErrors.apiToken = apiToken?.trim() ? "" : "API Token is required";
    setErrors(tempErrors);

    if (!merchantId || !apiToken) {
      return; // Exit if any field is empty
    }
    setLoading(true);

    const data = {
      clover_mid: merchantId,
      clover_api_token: apiToken,
    };

    try {
      let response;
      if (editMode) {
        response = await updateCloverKeys(data); // Call update API if in edit mode
      } else {
        response = await registerCloverAccount(data); // Call add API if not in edit mode
      }

      if (response?.data?.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          setSyncLoading(true); // Start sync loader
          syncProductsWithClover().then((response) => {
            setSyncLoading(false); // Stop sync loader
            if (response?.data?.success) {
              toast.success(response.data.message);
            } else {
              toast.error(response?.data?.message || 'Clover operation failed');
            }
          });
        }, 1000);
        setEditMode(true); // Set to edit mode after successful add
      } else {
        toast.error(response?.data?.message || 'Clover operation failed');
      }
    } catch (error) {
      toast.error('An error occurred during the Clover operation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-[2.19rem] bg-white p-[2rem] rounded-[1rem] pr-[40%] min-h-screen">
      {(loading || syncLoading) && <CustomLoader />}
      <div className="flex-1 flex flex-col gap-[1.25rem]">
        <div className="text-text text-[1.5rem] font-[600] w-fit">
          Link Clover
        </div>
        <UserInput
          label="Merchant ID"
          type="text"
          placeholder="xyz-3993"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          error={errors.merchantId}
        />
        <UserInput
          label="API Token"
          type="text"
          placeholder="Token"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          error={errors.apiToken}
        />
        <PrimaryButton label={editMode ? "Update Clover" : "Add Clover"} action={handleSubmit} />
      </div>
    </div>
  );
}
