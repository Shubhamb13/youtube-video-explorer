import React from "react";

const Button = ({ name, onClickk, className}) => {
  return (
    <div>
      <button
        onClick={onClickk}
        className={` p-2 m-2 px-3 rounded-md cursor-pointer ${className}`}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
