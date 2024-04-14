import React, { useEffect, useState } from "react";
import Table from "./paginated-Table";
import { useNavigate } from "react-router-dom";
import { getProductList, deleteProduct } from "../services/product";
import CustomLoader from "./loader";
import { toast } from "react-toastify";

export default function InventoryManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProductList();
      setProducts(response?.data?.products || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Product deleted successfully");
        fetchProducts();  // Refresh list after delete
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error during deletion");
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center p-[2rem]">
        <p className="text-gray-500 text-[1rem]">No products available.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>Inventory Management &gt; Table</h1>
        <button className='text-text text-[1rem] font-[500]' onClick={() => navigate('/dashboard/inventory-management-add')}>+ Add Article</button>
      </div>
      <Table data={products} handleDelete={handleDelete} />
    </div>
  );
}
