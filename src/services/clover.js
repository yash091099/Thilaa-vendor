const baseUrl = 'https://thilaa.jethitech.com/api/';
import useAxiosInstance from "./httpInterceptor";


export const registerCloverAccount = (data) => {
  const url = `${baseUrl}clover-integration`;
  return useAxiosInstance.post(url,data);
};

export const getCloverKeys = () => {
  const url = `${baseUrl}clover-keys`;
  return useAxiosInstance.get(url);
};

export const updateCloverKeys = (data) => {
  const url = `${baseUrl}clover-keys`;
  return useAxiosInstance.post(url,data);
};
export const syncProductsWithClover = () => {
  const url = `${baseUrl}sync-products`;
  return useAxiosInstance.get(url);
};

