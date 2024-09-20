import React from "react";

const Radio = ({ text }) => {
  return (
    <div>
      <ul>
        {text && text.map((item, id) => <li className="my-3 text-secondary" key={id}>● {item}</li>)}
      </ul>
    </div>
  );
};

export default Radio;
