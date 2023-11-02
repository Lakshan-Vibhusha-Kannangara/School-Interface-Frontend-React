import React, { useState, useEffect } from "react";
import "./Report.css";
import CustomSelect from "../CustomSelect/CustomSelect";

import TopNavbar from "../TopNavBar/TopNavBar";

interface Student {
  studentID: number;
  firstName: string;
  lastName: string;
}

interface SubjectTeacherPair {
  subjectName: string;
  teacherName: string;
}

interface StudentRef {
  contactPerson: string;
  contactNo: string;
  emailAddress: string;
  dateOfBirth: string;
  classroomID: number;
  subjectTeacherPairs: SubjectTeacherPair[];
}

const StudentReport: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [student, setStudent] = useState<StudentRef | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch("https://localhost:5001/api/Student/GetStudents")
      .then((response) => response.json())
      .then((data: Student[]) => {
        setStudents(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching students", error);
      });
  };

  const fetchStudentReports = (studentId: number) => {
    fetch(
      `https://localhost:5001/api/StudentDetailReport/GetStudentDetailReport/${studentId}`
    )
      .then((response) => response.json())
      .then((data: StudentRef) => {
        setStudent(data);
      })
      .catch((error) => {
        console.error("Error fetching student reports", error);
      });
  };

  const onStudentSelect = (event: number) => {
    setSelectedStudent(event);
    fetchStudentReports(event);
  };

  return (
  <div>
 <TopNavbar />
      <div className="form-box justify-content-center">
    
    <div className="col-xl-7 order-2 order-lg-1 justify-content-center"></div>
    <div className="row">
      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        Student Detail Report
      </p>

      <div className="justify-content-center">
      <div className="col-xl-10">
            <div className="row">
              <div className="col-xl-8">
                <img
                  src="/images/studentreport.svg"
                  className="image"
                  alt="Sample image"
                />
              </div>
              <div className="col-xl-4">
                <CustomSelect defaultOption="Select Student"
                  options={students.map((student) => ({
                    value: student.studentID,
                    label: student.firstName+" "+student.lastName,
                  }))}
                  onChange={(selectedValue: number) =>
                    onStudentSelect(selectedValue)
                  }
                />
              </div>
            </div>
            {student && (
              <div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="contactPerson" className="form-label">
                        Contact Person
                      </label>
                      <h5 className="form-control" id="contactPerson">
                        {student.contactPerson}
                      </h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="contactPerson" className="form-label">
                        Date of Birth
                      </label>
                      <h5 className="form-control" id="contactPerson">
                        {student.dateOfBirth}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="contactPerson" className="form-label">
                        Contact No
                      </label>
                      <h5 className="form-control" id="contactPerson">
                        {student.contactNo}
                      </h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="contactPerson" className="form-label">
                        Email Address
                      </label>
                      <h5 className="form-control" id="contactPerson">
                        {student.emailAddress}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4>Subject & Teacher List</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Subject Name</th>
                        <th>Teacher Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.subjectTeacherPairs.map((item, index) => (
                        <tr key={index}>
                          <td>{item.subjectName}</td>
                          <td>{item.teacherName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default StudentReport;
