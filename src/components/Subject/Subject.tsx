import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import axios from "axios";
import Notification from "../Notification/Notification";
import TopNavbar from "../TopNavBar/TopNavBar";

interface SubjectProps {

}

const Subject: React.FC<SubjectProps> = (props) => {
  const [notification, setNotification] = useState<{ state: string; text: string } | null>(null);

  const formFields = [
    {
      name: "SubjectName",
      type: "text" as "text",
      label: "Subject Name",
      required: true,
    },
  
  ];

  const handleFormSubmit = (formData: Record<string, string>) => {
    setNotification({ state: "sending", text: "Subject sending" });

    axios
      .post("https://localhost:5001/api/Subject/AddSubject", formData)
      .then((response) => {
        setNotification({
          state: "success",
          text: "Subject added successfully",
        });
        console.log("Subject data posted successfully:", response.data);
      })
      .catch((error) => {
        setNotification({
          state: "error",
          text: "Error adding subject",
        });
        console.error("Error posting subject data:", error);
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
        submitButtonText="Add Subject"
        onSubmit={handleFormSubmit}
        name={"Add Subject"}
        imgSrc={"/images/subject.svg"}
      />
    </div>
  );
};

export default Subject;
