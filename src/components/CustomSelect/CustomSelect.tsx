import React, { useState, ChangeEvent, ReactNode, useEffect } from 'react';
import './CustomSelect.css';

interface CustomSelectProps {
  options: { value: number; label: string }[];
  defaultOption?: string;
  onChange?: (selectedValue: number) => void;
  className?: string;
  children?: ReactNode;
  defaultSelectedValue?: number; 
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption ,
  onChange,
  className = '',
  children,
  defaultSelectedValue = 0,
}) => {
  const [selectedOption, setSelectedOption] = useState<number>(defaultSelectedValue);

  useEffect(() => {
    setSelectedOption(defaultSelectedValue);
  }, [defaultSelectedValue]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setSelectedOption(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }

  return (
    <div className={`select ${className}`}>
      <select value={selectedOption} onChange={handleSelectChange}>
        {defaultOption && (
          <option value="">
            {defaultOption}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
};


export default CustomSelect;
