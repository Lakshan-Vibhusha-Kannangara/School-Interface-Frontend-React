import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import axios from "axios";
import Notification from "../Notification/Notification";
import TopNavbar from "../TopNavBar/TopNavBar";

interface TeacherProps {

}

const Teacher: React.FC<TeacherProps> = (props) => {
  const [notification, setNotification] = useState<{ state: string, text: string } | null>(null);

  const formFields = [
    {
      name: "FirstName",
      type: "text" as "text",
      label: "First Name",
      required: true,
    },
    {
      name: "LastName",
      type: "text" as "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "emailAddress",
      type: "email" as "email",
      label: "Email",
      required: true,
    },
    {
      name: "ContactNo",
      type: "text" as "text",
      label: "Contact No",
      required: true,
    },
  ];

  const handleFormSubmit = (formData: Record<string, string>) => {
    setNotification({ state: "sending", text: "Teacher sending" });

    axios
      .post("https://localhost:5001/api/Teacher/AddTeacher", formData)
      .then((response) => {
        setNotification({
          state: "success",
          text: "Teacher added successfully",
        });
        console.log("Teacher data posted successfully:", response.data);
      })
      .catch((error) => {
        setNotification({
          state: "error",
          text: "Error adding teacher",
        });
        console.error("Error posting teacher data:", error);
      });
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notification]);

  return (
    <div>
       <TopNavbar />
 {notification && <Notification state={notification.state} text={notification.text} />}

      <Form
        fields={formFields}
        submitButtonText="Add Teacher"
        onSubmit={handleFormSubmit}
        name={"Add Teacher"}
        imgSrc={"/images/teacher.png"}
      />
    </div>
  );
};

export default Teacher;
