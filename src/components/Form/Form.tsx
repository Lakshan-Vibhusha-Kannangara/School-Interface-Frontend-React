import React, { useState, ChangeEvent, FormEvent, ReactNode } from "react";
import InputField from "../InputField/InputField";
import "./Form.css";

interface FormProps {
  onSubmit: (data: Record<string, string>) => void;
  fields: FormField[];
  submitButtonText: string;
  additionalContent?: ReactNode;
  name: string;
  imgSrc: string;
}

interface FormField {
  name: string;
  type: "text" | "email" | "password";
  label: string;
  required: boolean;
}

function Form({
  onSubmit,
  fields,
  submitButtonText,
  additionalContent,
  name,
  imgSrc,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-box">
      <h2>{name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <img src={imgSrc} alt="Form Image" className="image" />
          </div>
          <div className="col-md-6">
            {fields.map((field, index) => (
              <div key={index}>
                <InputField
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  label={field.label}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
        {additionalContent}
      </form>
    </div>
  );
}

export default Form;
