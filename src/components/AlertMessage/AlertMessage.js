import React from "react";

const AlertMessage = (props) => {
  
  return (
    <div class="alert alert-success" role="alert">
      {props.message}!
    </div>
  );
};

export default AlertMessage;
