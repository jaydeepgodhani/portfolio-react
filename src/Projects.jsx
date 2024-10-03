import React from "react";
import { textBlocks, textList } from "./helpers/utilities";
import Block from "./typography/Block";
import Heading from "./typography/Heading";
import Radio from "./typography/Radio";

const Projects = () => {
  return (
    <div className="animate-fade">
      <Heading text={"Skills"} />
      <Radio text={textList.skills}/>
      <Heading text={"Corporate Projects"} />
      {textBlocks.corpprojects.map((item, id) => <Block key={id} header={item[0]} body={item[1]} footer={item[2]}/>)}
      <Heading text={"Personal Exploration"} />
      {textBlocks.personalprojects.map((item, id) => <Block key={id} header={item[0]} body={item[1]} footer={item[2]}/>)}
    </div>
  );
};

export default Projects;
