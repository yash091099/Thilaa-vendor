// services/commonApi.js
// Implement the common functions for API handling, token management, and authentication
// services/login.js
import httpEncap from './httpEncap';
import instance from './httpInterceptor';
const baseUrl = 'https://thilaa.jethitech.com/api/';

export const getToken = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData?.token;
  };
  
  export const getCurrentUserId = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData?.accountId;
  };
  
  export const getNotifications = () => {
    const url = `${baseUrl}notifications`;
    return instance.get(url);
  }
  export const markNotificationAsRead = (id) => {
    const url = `${baseUrl}mark-read/${id}`;
    return instance.get(url);
  }


  export const getReports = () => {
    const url = `${baseUrl}analytics/2024`;
    return instance.get(url);
  }


  export const logout = () => {
    localStorage.clear();
    window.location.reload();
  };