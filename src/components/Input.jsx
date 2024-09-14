import React from "react";

const Input = ({ className, placeholder, value, onInputChange }) => {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onInputChange}
      required
    />
  );
};

export default Input;
