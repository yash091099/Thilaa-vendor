import React, { useRef } from 'react';
import editFile from '../assets/svg/edit.svg';
import fileUpload from '../assets/svg/file-upload.svg';

export default function UserTextArea(props) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    props.handleChangeFile(props.name, file);
  };
  return (
    <div className='flex flex-col gap-[8px] w-full'>
      <label className='text-[1rem] font-[600] leading-[1.25rem]'>{props.label}</label>
      <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${props.error ? 'border-red-500' : ''}`}>
        <div className="w-full outline-none text-[0.75rem] text-[#656565] font-[400]">
          <p>{props.text}</p>
          <p>{props.allowdFormats}</p>
        </div>
        <input
          type='file'
          onChange={handleFileChange} // Changed to props.onChange
          accept="image/jpeg, image/jpg, image/png"
          multiple={false} // Ensure only one file is selected
        />
        <img className="cursor-pointer w-[1.5rem]" src={fileUpload} alt="file"  />
      </div>
      {/* {props.error && <span className="text-red-500 text-sm">{props.error}</span>} */}
    </div>
  );
}