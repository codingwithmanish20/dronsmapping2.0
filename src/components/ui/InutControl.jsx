import React, { useState } from 'react';

const InputControl = ({name, value, onChange,placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`bg-[#1c213e] input-control-wraper border border-transparent flex items-center h-[40px] rounded-full relative overflow-hidden ${isFocused?' border border-softBlue':''}`}>
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        autoComplete="off"
        value={value}
        onChange={onChange}

        className='w-full input-control  bg-transparent  rounded-full px-4  text-white'
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default InputControl;
