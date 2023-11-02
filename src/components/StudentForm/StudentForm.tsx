import React, { useState, FormEvent, ReactNode } from "react";
import InputField from "../InputField/InputField";
import CustomSelect from "../CustomSelect/CustomSelect";
import "../StudentForm/StudentForm.css"
interface FormProps {
  onSubmit: (data: Record<string, string>) => void;
  fields: FormField[];
  submitButtonText: string;
  additionalContent?: ReactNode;

}
interface TextFormField {
  type: "text";
  name: string;
  label: string;
  required: boolean;
}

interface SelectFormField {
  type: "select";
  name: string;
  label: string;
  required: boolean;
  options: { value: number; label: string }[];
}

type FormField = TextFormField | SelectFormField;

function StudentForm({
  onSubmit,
  fields,
  submitButtonText,
  additionalContent,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  }


  const col1Fields = fields.filter((_, index) => index % 2 === 0);
  const col2Fields = fields.filter((_, index) => index % 2 !== 0);

  return (
    <div className="form-box1">
      <h2>Add Student</h2>
      <br />
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
        <img src="/images/student.svg" alt="Form Image" className="image" />
        </div>
        <div className="col">
        <div className="row justify-content-center">
          <div className="col col1">
          {col1Fields.map((field, index) => {
               if (field.type === "text") {
                return (
                  <div key={index}>
                    <InputField
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      label={field.label}
                      value={formData[field.name] || ""}
                      onChange={(event) =>
                        handleInputChange(field.name, event.target.value)
                      }
                    />
                  </div>
                );
              } else if (field.type === "select") {
                return (
                  <div key={index}>
                    <CustomSelect defaultOption="Select Classroom"
                      options={field.options}
                      onChange={(selectedValue) => handleInputChange(field.name, selectedValue.toString())}
             
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="col col2">
            {col2Fields.map((field, index) => {
               if (field.type === "text") {
                return (
                  <div key={index}>
                    <InputField
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      label={field.label}
                      value={formData[field.name] || ""}
                      onChange={(event) =>
                        handleInputChange(field.name, event.target.value)
                      }
                    />
                  </div>
                );
              } else if (field.type === "select") {
                return (
                  <div key={index}>
                    <CustomSelect defaultOption="Select Student"
                      options={field.options}
                      onChange={(selectedValue) => handleInputChange(field.name, selectedValue.toString())}
             
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        </div>
      </div>
      <br />
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
        {additionalContent}
      </form>
    </div>
  );
}



export default StudentForm;
