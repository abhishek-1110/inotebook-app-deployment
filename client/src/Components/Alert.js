import React from "react";

const Alert = (props) => {
  return (
    <div style={{  fontSize: 12 }}>
      {/* means props.message should not be in null state*/}
      {props.message && (
        <div
          className={`alert alert-${props.message.type} alert-dismissible fade show`}
          role="alert"
        >
          {props.message.type === "success" ? "Success " : ""}
          <strong>{props.message.message}</strong>
        </div>
      )}
    </div>
  );
};

export default Alert;
