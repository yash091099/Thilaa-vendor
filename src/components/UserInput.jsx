import React, { useState, useEffect, useRef } from 'react';
import eye from '../assets/svg/hide-password.svg';
import editFile from '../assets/svg/edit.svg';

export default function UserInput(props) {
  const fileRef = useRef(null);
  const [type, setType] = useState('text');
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    setType(props.type);
  }, [props.type]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file ? file.name : undefined);
  };

  return (
    <div className='flex flex-col gap-[8px] w-full'>
      <label className='text-[1rem] font-[600] leading-[1.25rem]'>{props.label}</label>
      <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${props.error ? 'border-red-500' : ''}`}>
        <input
          className={`w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] bg-transparent ${props.error ? 'text-red-500' : ''}`}
          type={type && type !== 'file' ? type : 'text'}
          placeholder={props.type === 'file' && file ? file : props.placeholder}
          disabled={props.type === 'file'}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
        {props.type === "file" && (
          <div>
            <input ref={fileRef} className='hidden' type='file' onChange={handleFileChange} />
            <img className="cursor-pointer w-[1.5rem]" src={editFile} alt="file" onClick={() => fileRef.current.click()} />
          </div>
        )}
        {props.ispassword && (
          <img className="cursor-pointer w-[1.5rem]" src={eye} alt="eye" onClick={() => setType(prev => prev === 'password' ? 'text' : 'password')} />
        )}
      </div>
      {props.error && <span className="text-red-500 text-sm">{props.error}</span>}
    </div>
  );
}
