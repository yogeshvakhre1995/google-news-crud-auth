import React, { useState } from "react";

const PageTitle = (props) => {
  const [title ] = useState(props.title);
  return (
    <>
      <div className="container-fluid p-5  bg-warning text-light border">
        <div className="container-xxl text-center">
          <h1>{title}</h1>
          <p>
            This container has a border and some extra padding and margins.
          </p>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
