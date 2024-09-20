import React from "react";
import Horizontal from "./Horizontal";
import Para from "./Para";

const Block = ({ header, body, footer }) => {
  return <div>
    <Para>
      {header}
    </Para>
    <Para>
      {body}
    </Para>
    <Para>
      {footer}
    </Para>
    <Horizontal />
  </div>;
};

export default Block;
