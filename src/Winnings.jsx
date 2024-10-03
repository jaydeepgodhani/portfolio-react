import React from "react";
import { textList } from "./helpers/utilities";
import Heading from "./typography/Heading";
import Radio from "./typography/Radio";

const Winnings = () => {
  return (
    <div className="animate-fade">
      <Heading text={"Certifications"} />
      <Radio text={textList.certifications}/>
      <Heading text={"Achievements"} />
      <Radio text={textList.achievements}/>
    </div>
  );
};

export default Winnings;
