import React, { useEffect, useState } from "react";
import LeftArrowIcon from "../assets/svg/left-arrow-light-icon.svg";
import RightArrowIcon from "../assets/svg/right-arrow-light-icon.svg";
import emptyIcon from '../assets/images/empty-notifications.svg';
import { getNotifications, markNotificationAsRead } from "../services/commonApi";
import { toast } from "react-toastify";
import CustomLoader from "./loader";
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(10);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      if (response?.data?.status) {
        const formattedNotifications = response.data.notifications.map((notification) => ({
          id: notification.id,
          title: notification.message,
          date: new Date(notification.created_at).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          time: new Date(notification.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
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
    fetchNotifications();
  }, []);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

  const handleClearAll = () => {
    setNotifications([]);
    toast.info("All notifications cleared");
  };
  const handleMarkAllAsRead = () => {
    const readPromises = notifications.map(notification =>
      markNotificationAsRead(notification.id)
    );
  
    axios.all(readPromises)
      .then(responses => {
        let allSuccess = true; // Assuming all requests succeed initially
  
        responses.forEach((response, index) => {
          if (!response.data.status) { // Check for the correct response property
            allSuccess = false;
            console.log(response, notifications[index]?.id, '--------notification error --------');
            toast.error(`Failed to mark notification ${notifications[index]?.id} as read`);
          }
        });
  
        if (allSuccess) {
          toast.success("All notifications marked as read");
          fetchNotifications(); // Refresh notifications if all marked as read
        }
      })
      .catch(error => {
        console.error("Error marking all notifications as read:", error);
        toast.error("An error occurred while marking notifications as read");
      });
  };
  
  

  const handleNextPage = () => {
    if (currentPage < Math.ceil(notifications.length / notificationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-[2.5rem] p-[1rem]">
      {loading && <CustomLoader />}
      <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
        Notifications
      </h1>
      <div>
       {currentNotifications.length > 0 && <div className="flex flex-row items-center justify-end border-y border-text/10 px-[0.62rem] py-[0.81rem] ">
          <div className="cursor-pointer text-center text-[12px] font-[600] underline text-dark mr-[57px]" onClick={handleMarkAllAsRead}>
            Mark all as read
          </div>
          <div className="cursor-pointer text-center text-[12px] font-[600] underline text-dark mr-[57px]" onClick={handleClearAll}>
            Clear all
          </div>
          <h1 className="text-center text-[15px] font-[400] text-[#4B465C] mr-[33px] opacity-[50%]">
            {`${indexOfFirstNotification + 1}-${indexOfLastNotification < notifications.length ? indexOfLastNotification : notifications.length} of ${notifications.length}`}
          </h1>
          <div className="flex gap-[0.75rem]" style={{cursor: 'pointer'}}>
            <img src={LeftArrowIcon} alt="previous"  onClick={handlePrevPage} />
            <img src={RightArrowIcon} alt="next"  onClick={handleNextPage} />
          </div>
        </div>}
        {currentNotifications.length > 0 ? (
          <div>
            {currentNotifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <div className="flex flex-row justify-between px-[1.25rem] py-[0.88rem]">
                  <h2 className="ml-5 text-[16px] font-medium text-[#5B6572]">
                    {notification.title}
                  </h2>
                  <div className="flex gap-[2.5rem]">
                    <h3 className="font-normal text-[#4B465C] text-[13px] opacity-[50%]">
                      {notification.date}
                    </h3>
                    <h3 className="font-normal text-[#4B465C] text-[13px] opacity-[50%]">
                      {notification.time}
                    </h3>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="py-[2.5rem]">
              <img className="w-[27rem]" src={emptyIcon} alt="Empty" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
