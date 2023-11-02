import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;

}

function InputField({ type, name, value, label, onChange, required}: InputFieldProps) {
  return (
    <div className="user-box">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
     
      />
      <label>{label}</label>
    </div>
  );
}

export default InputField;
