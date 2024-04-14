const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getProfileDetails = () => {
  const url = `${baseUrl}vendor-profile`;
  return instance.get(url);
};
export const getVendorDocumentDetails = () => {
  const url = `${baseUrl}vendor-store-documents`;
  return instance.get(url);
};
export const updateVendorDocumentDetails = (data) => {
  const url = `${baseUrl}vendor-store-documents`;
  return instance.post(url,data);
};
export const getVendorBankDetails = () => {
  const url = `${baseUrl}vendor-bank-documents`;
  return instance.get(url);
};
export const updateVendorBankDetails = (data) => {
  const url = `${baseUrl}vendor-bank-documents`;
  return instance.post(url,data);
};
export const updateProfileDetails = (data) => {
  const url = `${baseUrl}vendor-profile`;
  return instance.post(url, data);
};

export const getStoreDetails = () => {
  const url = `${baseUrl}store-details`;
  return instance.get(url);
}

export const updateStoreDetails = (data) => {
  const url = `${baseUrl}store-details`;
  return instance.post(url, data);
}
