import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import acceptedIcon from '../assets/svg/accepted-orders.svg';
import rejectedIcon from '../assets/svg/rejected-orders.svg';
import productsIcon from '../assets/svg/products.svg';
import revenueIcon from '../assets/svg/revenue.svg';
import Table from './Table';
import ReportCard from './ReportCard';
import  CustomLoader  from './loader';
import { toast } from 'react-toastify';
import { getVendorDashboard } from '../services/dashboard';
import LineGraph from './LineGraph';
export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [profit_report]=useState([
      0,0,0,0,0,0,0,0,0,0,0,0
  ])

  useEffect(() => {
    setLoading(true);
    getVendorDashboard()
      .then(response => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CustomLoader />;
  }

  if (!dashboardData) {
    return null;
  }

  const { inventory } = dashboardData;

  return (
    <div className='flex flex-col gap-[2rem]'>
      <div className='flex flex-col gap-[1.5rem] bg-white p-[2rem] rounded-[1rem] '>
        <h1 className='text-[1.5rem] font-[600]'>Vendor Dashboard</h1>
        <div className='flex gap-[1.25rem]'>
          <DashboardCard image={acceptedIcon} value={dashboardData.total_orders.toString()} label="Total Orders" />
          <DashboardCard image={rejectedIcon} value={dashboardData?.delivered_orders?.toString()} label="Delivered Orders" />
          <DashboardCard image={revenueIcon} value={dashboardData.revenue.toString()} label="Revenue" />
          <DashboardCard image={productsIcon} value={dashboardData?.products?.toString()} label="Products" />
        </div>
      </div>
      <ReportCard label="Profit Report" value={`$ ${profit_report?.reduce((a, b) => a + b, 0)}`} filterOptions={["October"]}>
        <LineGraph data={profit_report} />

      </ReportCard>
      <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md'>
        <div className="flex justify-between">
          <h1 className='text-text text-[1.5rem] font-[600]'>Inventory stats</h1>
        </div>
        <Table data={inventory} />
      </div>
    
    </div>
  )
}
