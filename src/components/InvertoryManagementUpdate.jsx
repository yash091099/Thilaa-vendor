import React, { useEffect, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import FieldInput from './FieldInput';
import SuccessModal from './SuccessModal';
import CustomLoader from './loader';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductDetails, getCategories, updateProducts } from '../services/product';
import { toast } from 'react-toastify';

export default function InventoryManagementUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state)
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    if (!location?.state?.user?.id) return;
    setLoading(true);
    try {
      const response = await getProductDetails(location?.state?.user?.id);
      if (response?.data?.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      toast.error('Failed to fetch product details');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response?.data?.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const validateForm = () => {
    const { name, sku, price, category_id, stock_available } = product;
    if (!name || !sku || !price || !category_id || !stock_available) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    if(!product.id){
      return;
    }
    setLoading(true);
    try {
      const response=await updateProducts({
        id: product.id,
        name: product.name,
        category_id: product.category_id,
        price: product.price,
        sku: product.sku,
        stock_quantity: product.stock_available,
        pricing_type: product.pricing_type
      });
      if(response?.data?.success){

        toast.success('Product updated successfully');
      }else{
        toast.error('Failed to update product');
      }
      setSuccessModal(true);
    } catch (error) {
      toast.error('Failed to update product');
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Inventory Management &gt; Update</h1>
      <div className='flex flex-col gap-[1.25rem] w-1/2'>
        {Object.entries({ "Article Name": "name", "SKU": "sku", "Price": "price", "Unit": "stock_available" }).map(([label, key]) => (
          <FieldInput
            label={label}
            boldLabel={true}
            value={product[key]}
            onChange={(e) => setProduct({ ...product, [key]: e.target.value })}
          />
        ))}
        <div className='flex flex-col gap-[0.25rem]'>
          <p className='text-[1rem] font-[600] font-bold'>
            Category:
          </p>
          <div className='flex w-full items-center px-[0.88rem] py-[0.44rem] rounded-[0.375rem] border border-[#4B465C]/20'>
            <select
              className='w-full outline-none'
              value={product.category_id}
              onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} style={{ backgroundImage: `url(${cat.image})`, backgroundSize: '30px 30px', backgroundRepeat: 'no-repeat', paddingLeft: '40px' }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='w-1/2'>
          <PrimaryButton label="Update" action={handleUpdate} />
        </div>
      </div>
      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} onClickAction={() => navigate('/dashboard/inventory-management')} />}
      {loading && <CustomLoader />}
    </div>
  );
}
