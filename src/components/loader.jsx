import React from "react";
import { AtomSpinner } from "react-epic-spinners";

const CustomLoader = () => {
  return (
    <div className="loader-container">
      <div className="backdrop" />
      <div className="loader">
        <AtomSpinner color="#93e6a9" />
      </div>
    </div>
  );
};

export default CustomLoader;
