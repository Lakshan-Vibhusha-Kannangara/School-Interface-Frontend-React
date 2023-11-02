
import React, { Component, FormEvent } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import './FormTable.css';

interface Teacher {
  teacherID: number;
  firstName: string;
}
interface Classroom {
  classroomID: number;
  classroomName: string;
}

interface FormTableProps {
  data: any[];
  onSelection1: (value: any) => void;
  onSelection2: (value: any) => void;
  onDeAllocation: (number1: number, number2: number) => void;
  onSubmit: (data: string) => void;
  text1: string;
  text2: string;
  options1: any[];
  options2: any[];
  name: string;
  selectedClass?: Classroom | null;
  selectedTeacher?: Teacher | null;
  img: string;
  btntxt: string;
  options1Name: string;
  options2Name: string;
  tag1:string;
  tag2:string
  tag3:string;
}

class FormTable extends Component<FormTableProps> {
  render() {
    const {
      data,
      onSelection1,
      onSelection2,
      onSubmit,
      onDeAllocation,
      text1,
      text2,
      options1,
      options2,
      options1Name,
      options2Name,
      name,
      tag1,
      tag2,
      tag3,
      img,
      btntxt,
    } = this.props;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit("data");
    }

    return (
      <div className="form-box1">
        <h2>{name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <img src={img} alt="Form Image" className="image" />
            </div>
            <div className="col-md-6">
              <h5 className="text-white">{text1}:</h5>
              <CustomSelect defaultOption={options1Name} options={options1} onChange={onSelection1}></CustomSelect>
              <br />
              <h5 className="text-white">{text2}:</h5>
              <CustomSelect defaultOption={options2Name} options={options2} onChange={onSelection2}></CustomSelect>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                {btntxt}
              </button>
              <br />
              <br />
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <table className="table table-bordered table-dark">
                    <thead>
                      <tr>
                        <th>Teacher</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                        <td>{item.teacherName}</td>
                          <td>
                            <button type='button' className='btn btn-light'
                              onClick={() => onDeAllocation(item[tag1], item[tag2])}
                            >
                              Deallocate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormTable;