const baseUrl = 'https://thilaa.jethitech.com/api/';
import useAxiosInstance from "./httpInterceptor";


export const getOrders = () => {
  const url = `${baseUrl}orders`;
  return useAxiosInstance.get(url);
};


export const viewOrderDetails=(id) => {
  const url = `${baseUrl}orders/${id}`;
  return useAxiosInstance.get(url);
}

