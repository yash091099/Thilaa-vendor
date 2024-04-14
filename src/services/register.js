// services/login.js
import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';

export const registerVendor = (data) => {
  return httpEncap.post(baseUrl + 'onboard-vendor', data);
};
export const registerVendorStore = (data) => {
  return httpEncap.post(baseUrl + 'stores', data);
};

export const uploadStoreDocument = (data) => {
  return httpEncap.post(baseUrl + 'store-documents', data);
};
export const uploadStoreBankDetails = (data) => {
  return httpEncap.post(baseUrl + 'store-bank-documents', data);
};
export const vendorLogin = (data) => {
  return httpEncap.post(baseUrl + 'vendor-login', data);
};


