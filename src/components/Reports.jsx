import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import CustomLoader from './loader';
import { getReports } from '../services/commonApi';
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Reports() {
    const [loading,setLoading] = useState(false);
    const [reports, setReports] = useState({
        total_orders_by_year: [],
        delivered_orders_by_year: [],
        revenue_by_year: [],
    });
    const [showDeliveredOrders, setShowDeliveredOrders] = useState(true);
    const [showRevenue, setShowRevenue] = useState(true);
    const [showOrders, setShowOrders] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            const response = await getReports();

                setReports(response.data);
            
            setLoading(false);
        };
        fetchReports();
    }, []);

    const data = monthNames.map((month, index) => ({
        month,
        Delivered_Orders: reports.delivered_orders_by_year?.[index] || 0,
        Revenue: reports.revenue_by_year?.[index] || 0,
        Orders: reports.total_orders_by_year?.[index] || 0
    }));

    return (
        <div className='flex flex-col gap-[2rem] mx-[1rem]'>
            {loading&&<CustomLoader/>}
            <div className='bg-white rounded-[1rem] w-full'>
                <h1 className='text-[1.5rem] font-[600] px-[2rem] pt-[2rem]'>Analytics & Reports</h1>
                <ReportCard label="Order Statistics" darkHeading={true} value={`Delivered Orders: ${reports.delivered_orders_by_year?.reduce((a, b) => a + b, 0)}, Total Orders: ${reports.total_orders_by_year?.reduce((a, b) => a + b, 0)}`} filterOptions={["Today"]} onClick={() => { setShowDeliveredOrders(!showDeliveredOrders); setShowOrders(!showOrders); }}>
                    <LineChart width={1000} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {showDeliveredOrders && <Line type="monotone" dataKey="Delivered_Orders" stroke="#BCE8B1" strokeWidth={4} />}
                        {showOrders && <Line type="monotone" dataKey="Orders" stroke="#A8B6FF" strokeWidth={4} />}
                    </LineChart>
                </ReportCard>
            </div>
            <ReportCard label="Revenue Report" value={`$ ${reports.revenue_by_year?.reduce((a, b) => a + b, 0).toFixed(2)}`} filterOptions={["October"]} onClick={() => setShowRevenue(!showRevenue)}>
                <LineChart width={1000} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    {showRevenue && <Line type="monotone" dataKey="Revenue" stroke="#BCE8B1" strokeWidth={4} fill="#A8B6FF" />}
                </LineChart>
            </ReportCard>
          
        </div>
    );
}
