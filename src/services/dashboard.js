const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getVendorDashboard = () => {
  const url = `${baseUrl}vendor-dashboard`;
  return instance.get(url);
};


export const logout = () => {
  localStorage.clear();
  window.location.reload();
}