import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "../StudentForm/StudentForm";

import Notification from "../Notification/Notification";
import TopNavbar from "../TopNavBar/TopNavBar";

function StudentRegister() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [notification, setNotification] = useState<{ state: string, text: string } | null>(null);


  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    birthday: "",
    emailAddress: "",
    contactPerson: "",
    contactNo: "",
    classroomID: "",
  });

  interface Classroom {
    classroomID: number;
    classroomName: string;
  }

  interface StudentFormData {
    firstName: string;
    lastName: string;
    birthday: string;
    emailAddress: string;
    contactPerson: string;
    contactNo: string;
    classroomID: string;
  }

  useEffect(() => {
   
    axios
      .get<Classroom[]>("https://localhost:5001/api/Classroom/GetClassrooms")
      .then((response) => {
     
        setClassrooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classrooms", error);
        setNotification({ state: "error", text: "Error getting student" });
   
      });
  }, []);



  function handleFormSubmit(data: Record<string, string>): void {
    console.log("here data....",data)
    setNotification({ state: "sending", text: "Student sending" });


    axios
      .post("https://localhost:5001/api/Student/AddStudent", data)
      .then((response) => {
        setTimeout(() => {
          setNotification({ state: "success", text: "Student registered successfully" });
        }, 2000);
 
     
        console.log("Student registered successfully:", response.data);
        // Optionally, you can reset the form here
        setFormData({
          firstName: "",
          lastName: "",
          birthday: "",
          emailAddress: "",
          contactPerson: "",
          contactNo: "",
          classroomID: "",
        });
      })
      .catch((error) => {
        setNotification({ state: "error", text: "Error registering student" });

        console.error("Error registering student", error);
      });

    }
    useEffect(() => {
      const notificationTimeout = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(notificationTimeout); 
    }, [notification]); 
  return (
    <div>
       <TopNavbar />
 {notification && <Notification state={notification.state} text={notification.text} />}

      <StudentForm
        fields={[
          {
            name: "firstName",
            type: "text",
            label: "First Name",
            required: true,
          },
          {
            name: "lastName",
            type: "text",
            label: "Last Name",
            required: true,
          },
          {
            name: "birthday",
            type: "text",
            label: "Birth Day",
            required: true,
          },
          {
            name: "emailAddress",
            type: "text",
            label: "Email Address",
            required: true,
          },
          {
            name: "contactPerson",
            type: "text",
            label: "Contact Person",
            required: true,
          },
          {
            name: "contactNo",
            type: "text",
            label: "Contact No",
            required: true,
          },
          {
            name: "classroomID",
            type: "select",
            label: "Classroom",
            required: true,
            options: classrooms.map((classroom) => ({
              value: classroom.classroomID,
              label: classroom.classroomName,
            })),
          },
        ]}
        submitButtonText="Register"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default StudentRegister;
