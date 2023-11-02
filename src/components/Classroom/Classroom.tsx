import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import axios from "axios";
import Notification from "../Notification/Notification";
import TopNavbar from "../TopNavBar/TopNavBar";
import { api_url } from "../env";
export interface Classroom {
  classroomID?: number;
  classroomName: string;
}

const Classroom: React.FC<Classroom> = (props) => {
  const [notification, setNotification] = useState<{ state: string, text: string } | null>(null);

  const formFields = [
    {
      name: "classroomName",
      type: "text" as "text",
      label: "Classroom",
      required: true,
    },
  ];

  const handleFormSubmit = (formData: Record<string, string>) => {
    setNotification({ state: "sending", text: "Classroom sending" });

    axios
      .post(`${api_url}/Classroom/AddClassroom`, formData)
      .then((response) => {
        setNotification({
          state: "success",
          text: "Classroom added successfully",
        });
        console.log("Classroom data posted successfully:", response.data);
      })
      .catch((error) => {
        setNotification({
          state: "error",
          text: "Error adding classroom",
        });
        console.error("Error posting classroom data:", error);
      });
  };

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

      <Form
        fields={formFields}
        submitButtonText="Add Classroom"
        onSubmit={handleFormSubmit}
        name={"Add Classroom"}
        imgSrc={"/images/classroom.png"}
      />
    </div>
  );
};

export default Classroom;
