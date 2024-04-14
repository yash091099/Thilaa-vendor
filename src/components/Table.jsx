import React, { useState } from 'react';
import upDark from '../assets/svg/up-icon-dark.svg';
import downLight from '../assets/svg/down-icon-light.svg';

export default function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [sortedData, setSortedData] = useState(data);

  const columns = [
    { name: "ARTICLE NAME", enableSorting: true, searchingEnabled: true, key: 'name' },
    { name: "SKU", enableSorting: true, searchingEnabled: true, key: 'sku' },
    { name: "QUANTITY", enableSorting: true, searchingEnabled: true, key: 'stock_available' },
    { name: "PRICE/UNIT ($)", enableSorting: true, searchingEnabled: true, key: 'price' },
    { name: "STATUS", enableSorting: true, searchingEnabled: true, key: 'status' }
  ];

  const mapDataToFields = (item) => ([
    item.name?.split(' ')?.map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' '),
    item.sku,
    item?.stock_available,
    `${item?.price || 0}`,
    item?.status
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
    setCurrentPage(1); // Reset to first page with new sorting
  };

  return (
    <div className='flex flex-col gap-[2.5rem]'>
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
                <tr key={index} className='cursor-pointer h-[5rem] border-y border-[#DBDADE]'>
                  {
                    fields.map((field, fieldIndex) => (
                      <td key={fieldIndex} className='px-[1.56rem] py-[0.62rem]'>
                        <div className='flex gap-8 items-center'>
                          <p className='text-[#4B465C] text-[1.125rem] font-[400]'>{field}</p>
                        </div>
                      </td>
                    ))
                  }
                </tr>
              );
            })}
            {!sortedData.length && <tr><td colSpan={columns.length} className='px-[1.56rem] text-center py-[0.62rem]'><p className='text-[#4B465C] text-[1rem] font-[400]'>No Inventory Data Found</p></td></tr>}
          </tbody>
        </table>
      </div>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]'>Showing {sortedData.length ? 1 : 0} to {Math.min(10, sortedData.length)} of {sortedData.length}</p>
      </div>
    </div>
  );
}
