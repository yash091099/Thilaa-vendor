import React, { useState } from "react";
import logo from "../assets/Thilaa-Logo.svg";
import dashboardIcon from "../assets/svg/dashboard-icon.svg";
import RighttArrowIcon from "../assets/svg/right-arrow-light-icon.svg";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/commonApi";
export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-w-[19.6875rem] h-full min-h-screen bg-white shadow-xl">
      <div className="flex justify-between items-center text-text text-[3.5rem] font-[600] w-full px-[1.25rem] py-[2.5rem]" onClick={()=>{navigate('/dashboard')}}>
        <img className="w-[4.0625rem]" src={logo} alt="Logo" />
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <circle cx="10.4998" cy="10.5" r="0.833333" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.4998" cy="10.5" r="0.833333" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.5" cy="10.5" r="7.5" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.5" cy="10.5" r="7.5" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="flex flex-col px-[0.75rem]">
        <ListItem
          label="Dashboard"
          image={dashboardIcon}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={()=>{navigate('/dashboard')}}
        ></ListItem>
        <ListItem
          label="Inventory Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {navigate('/dashboard/inventory-management')}}
        >
        </ListItem>
        <ListItem
          label="Orders"
          isParent={true}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={()=>{}}
        >
          <ListItem
            label="View"
            activeOption={selectedOption}
            setActive={setSelectedOption}
            action={() => { navigate('/dashboard/order-management')}}
          ></ListItem>
          {/* <ListItem
            label="Details"
            activeOption={selectedOption}
            setActive={setSelectedOption}
            action={() => {navigate('/dashboard/order-management-details')}}
          ></ListItem> */}
        </ListItem>
        {/* <ListItem
          label="Payments/Transactions"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {}}
        ></ListItem> */}
        <ListItem
          label="Reports"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {navigate('/dashboard/reports')}}
        ></ListItem>
        
        <ListItem
          label="Settings"
          isParent={true}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {}}
        >
          <ListItem
            label="Profile"
            activeOption={selectedOption}
            setActive={setSelectedOption}
            action={() => {navigate('/dashboard/profile-management')}}
          ></ListItem>
          <ListItem
            label="Link Clover"
            activeOption={selectedOption}
            setActive={setSelectedOption}
            action={() => {navigate('/dashboard/link-clover')}}
          ></ListItem>
          <ListItem
            label="Logout"
            activeOption={selectedOption}
            setActive={setSelectedOption}
            action={() => {logout()}}
          ></ListItem>
        </ListItem>
      </div>
    </div>
  );
}
