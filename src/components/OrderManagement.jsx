import React, { useEffect, useState } from "react";
import Table from "./paginated-Table";
import { useNavigate } from "react-router-dom";
import CustomLoader from "./loader";
import { toast } from "react-toastify";
import TablePaginatedOrder from "./Table-Paginated-Order";
import { getOrders } from "../services/order";

export default function OrderManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      setOrders(response?.data?.orders || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
    setLoading(false);
  };



  if (loading) {
    return <CustomLoader />;
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center p-[2rem]">
        <p className="text-gray-500 text-[1rem]">No orders available.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>Order Management &gt; Table</h1>
      </div>
      <TablePaginatedOrder data={orders}/>
    </div>
  );
}
