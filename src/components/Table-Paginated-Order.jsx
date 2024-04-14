import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upDark from '../assets/svg/up-icon-dark.svg';
import downLight from '../assets/svg/down-icon-light.svg';
import { ContentCopy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function TablePaginatedOrder({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [sortedData, setSortedData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const columns = [
    { name: "ORDER ID", enableSorting: true, searchingEnabled: true, key: 'order_id' },
    { name: "ORDER DATE", enableSorting: true, searchingEnabled: true, key: 'ordered_on' },
    { name: "ORDER AMOUNT($)", enableSorting: true, searchingEnabled: true, key: 'amount' },
    { name: "STATUS", enableSorting: true, searchingEnabled: true, key: 'status' }
  ];

  const handleRowClick = (item) => {
    console.log(item,'----------------------')
    navigate('/dashboard/order-management-details', { state: { details: item } });
  };

  const formatDateAndTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let hour = '' + d.getHours();
    let minute = '' + d.getMinutes();
    let second = '' + d.getSeconds();
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return [day, month, year].join('/') + ' ' + [hour, minute, second].join(':') + ' ' + amPm;
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      Created: { text: '#C428C7', background: '#C428C729' },
      Paid: { text: '#28C76F', background: '#28C76F29' },
      Fulfilled: { text: '#FFA338', background: '#FFA33829' },
      Refunded: { text: '#2855C7', background: '#2855C729' }
    };
    return <span style={{ color: statusColors[status]?.text, backgroundColor: statusColors[status]?.background, padding: '0.5rem 1rem', borderRadius: '0.25rem' }}>{status}</span>;
  }

  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Order ID copied!');
    });
  }

  const filterData = (search) => {
    if (!search.trim()) {
      setSortedData(data);
      return;
    }
    const filteredData = data.filter(item => item.order_id.toString().toLowerCase().includes(search.toLowerCase()));
    setSortedData(filteredData);
  }

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const mapDataToFields = (item) => ([
    <>
      #{item.order_id}
      <span className="cursor-pointer ml-2" onClick={(e) => handleCopy(e, item.order_id)}><ContentCopy/></span>
    </>,
    formatDateAndTime(item.ordered_on),
    `$ ${item.amount || 0}`,
    getStatusBadge(item.status)
  ]);

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortedData(sortedData);
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col gap-[2.5rem]'>
      <input
        type="text"
        placeholder="Search by Order ID"
        value={searchTerm}
        onChange={onSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className='flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-[#DBDADE]'>
              {columns.map((column, index) => (
                <th key={index} className='text-left px-[1rem] py-[0.62rem]'>
                  <div className='flex gap-8 items-center'>
                    <p className='text-[#4B465C] text-[1.01563rem] font-[600] tracking-[0.07813rem]'>{column.name}</p>
                    {column.enableSorting && (
                      <div onClick={() => onSort(column.key)}>
                        <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={upDark} alt={`Sort Ascending for ${column.name}`} />
                        <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={downLight} alt={`Sort Descending for ${column.name}`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const fields = mapDataToFields(item);
              return (
                <tr key={index} className='cursor-pointer h-[5rem] border-y border-[#DBDADE] hover:shadow-lg' onClick={() => handleRowClick(item)}>
                  {fields.map((field, fieldIndex) => (
                    <td key={fieldIndex} className='px-[1.56rem] py-[0.62rem]'>
                      <div className='flex gap-8 items-center'>{field}</div>
                    </td>
                  ))}
                </tr>
              );
            })}
            {!sortedData.length && <tr><td colSpan={columns.length} className='px-[1.56rem] text-center py-[0.62rem]'><p className='text-[#4B465C] text-[1rem] font-[400]'>No Order Data Found</p></td></tr>}
          </tbody>
        </table>
      </div>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]'>Showing {sortedData.length ? 1 : 0} to {Math.min(10, sortedData.length)} of {sortedData.length}</p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
