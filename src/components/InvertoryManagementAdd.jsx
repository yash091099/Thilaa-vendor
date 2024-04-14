import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import FieldInput from './FieldInput';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';
import { getCategories, addProducts } from '../services/product';
import CustomLoader from './loader';
import { toast } from 'react-toastify';
import fileUploadIcon from '../assets/svg/file-upload.svg';

export default function InventoryManagementAdd() {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '', category_id: '', sku: '', price: '', pricing_type: 'Fixed', stock_quantity: '', image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const { name, sku, price, pricing_type, stock_quantity, category_id, image } = product;
    if (!name || !sku || !price || !pricing_type || !stock_quantity || !category_id || !image) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category_id', product.category_id);
    formData.append('sku', product.sku);
    formData.append('price', product.price);
    formData.append('pricing_type', product.pricing_type);
    formData.append('stock_quantity', product.stock_quantity);
    formData.append('image', product.image);

    try {
      const response = await addProducts(formData); // Assume addProducts accepts FormData
      if (response?.data.success) {
        setSuccessModal(true);
        toast.success(`Product ${response.data?.product?.name} added successfully`);
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Inventory Management &gt; Table</h1>
      <div className='flex flex-col gap-[1.25rem] w-1/2'>
        {[
          { label: "Product Name", placeholder: "Oats", stateKey: "name" },
          { label: "SKU", placeholder: "PRD001", stateKey: "sku" },
          { label: "Price", placeholder: "49", stateKey: "price" },
          { label: "Pricing Type", placeholder: "Fixed", stateKey: "pricing_type" },
          { label: "Stock Quantity", placeholder: "20", stateKey: "stock_quantity" }
        ].map(field => (
          <FieldInput key={field.label} label={field.label} value={product[field.stateKey]} boldLabel={true} disabled={field.label === "Pricing Type"} placeholder={field.placeholder} type="text" onChange={e => setProduct({ ...product, [field.stateKey]: e.target.value })} required />
        ))}
        <div className='flex flex-col gap-[0.25rem]'>
          <p className='text-[1rem] font-[600] font-bold'>Category:</p>
          <div className='flex w-full items-center px-[0.88rem] py-[0.44rem] rounded-[0.375rem] border border-[#4B465C]/20'>
            <select className='w-full outline-none' value={product.category_id} onChange={e => setProduct({ ...product, category_id: e.target.value })} required style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex justify-between items-center py-[0.625rem]'>
          <p className='text-[0.75rem] text-[#656565] font-[400]'>Upload Article Image (JPEG, JPG, PNG):</p>
          <button onClick={triggerFileSelect} className='flex items-center gap-[0.5rem] cursor-pointer'>
            <img src={fileUploadIcon} alt="Upload" className="w-[1.5rem]" />
          </button>
          <input ref={fileInputRef} type='file' onChange={handleChangeFile} accept="image/jpeg, image/jpg, image/png" style={{ display: 'none' }} />
        </div>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-[200px] h-[200px] object-cover" />}
        <div className='w-1/2'><PrimaryButton label="Add" action={handleAddProduct} /></div>
      </div>
      {loading && <CustomLoader />}
      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} onClickAction={() => { navigate('/dashboard/inventory-management'); }} />}
    </div>
  );
}
