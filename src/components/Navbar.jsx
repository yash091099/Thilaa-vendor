import React, { useState, useEffect, useRef, useContext } from 'react';
import notificationIcon from '../assets/svg/bell.svg';
import profilePicture from '../assets/images/profile.png';
import searchIcon from '../assets/svg/SearchIcon.svg';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../services/commonApi';
import { logout } from '../services/commonApi';
import CustomLoader from './loader';
import { AppContext } from '../context/AppContext';
const sidebarItems = [
  { label: "Dashboard", action: "/dashboard" },
  { label: "Inventory Management", action: "/dashboard/inventory-management" },
  { label: "Order View", action: "/dashboard/order-management" },
  { label: "Order Details", action: "/dashboard/order-management-details" },
  // { label: "Payments/Transactions", action: "" },
  { label: "Reports", action: "/dashboard/reports" },
  { label: "Profile Setting", action: "/dashboard/profile-management" },
  { label: "Link Clover Setting", action: "/dashboard/link-clover" },
  { label: "Logout", action: "logout" }
];

export default function Navbar() {

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const fetchNotifications = async () => {
    // setLoading(true);
    try {
      const response = await getNotifications();
      if (response?.data?.status) {
        const formattedNotifications = response.data.notifications.map(notification => ({
          id: notification.id,
          title: notification.message,
          date: new Date(notification.created_at).toLocaleDateString('en-US', {
          day: '2-digit', month: '2-digit', year: 'numeric' }),
          time: new Date(notification.created_at).toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', hour12: true }),
        }));
        setNotifications(formattedNotifications);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch notifications");
    }
    setLoading(false);
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNotifications, 15000); // Fetch every 30 seconds

    // Cleanup function to clear the interval when the component is unmounted
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === '/') {
        searchInputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = sidebarItems.filter(item => item.label.toLowerCase().includes(query));
    setSearchResults(filtered);
  };

  const handleSearchItemClick = (action) => {
    if (action === "logout") {
      logout();
    } else {
      navigate(action);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <nav className='flex justify-between items-center gap-[2rem] w-full bg-white px-[1.5rem] py-[0.75rem] rounded-md'>
      {/* {loading && <CustomLoader/>} */}
      <div className='flex gap-[0.62rem] items-center w-full'>
        <img className="w-[1.65rem]" src={searchIcon} alt="search"/>
        <input
          ref={searchInputRef}
          className='outline-none w-full border-r-2 border-black'
          type='text'
          placeholder='Search (Ctrl+/)'
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && searchResults.length > 0 && (
          <div style={{position: 'absolute', top: '4vw', width: "40vw"}} className="bg-white border border-gray-200 rounded-md shadow-lg">
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchItemClick(item.action)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex items-center gap-[2rem] w-fit'>
        <div className='cursor-pointer relative' onClick={() => navigate('/dashboard/notifications')}>
          <img className="w-[1.625rem]" src={notificationIcon} alt="notifications" />
          <div className='absolute -top-1 -right-2 flex justify-center items-center text-white text-[0.8125rem] font-[600] leading-[0.875rem] w-[18px] h-[18px] bg-[#EA5455] rounded-[9px]'>
            <p>{notifications.length||0}</p>
          </div>
        </div>
        <div className='relative cursor-pointer' onClick={() => navigate('/dashboard/profile-management')}>
          <div className='bg-dark w-fit rounded-[50%] overflow-hidden'>
            <img className='w-[2.375rem]' src={profilePicture} alt="profile"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
