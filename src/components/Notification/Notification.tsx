import React from "react";
import "./Notification.css";

interface NotificationProps {
  state: string | null;
  text: string;
}

function Notification({ state, text }: NotificationProps) {

  if (state === null) {
    return null;
  }

 
  const className = `alert alert-${state === "success" ? "success" : state === "sending" ? "sending" : "danger"}`;


  return (
    <div className="notification new">
      <div className={className} role="alert">
        {text}
      </div>
      <div className="loading">Loading&#8230;</div>
    </div>
  );
}

export default Notification;
