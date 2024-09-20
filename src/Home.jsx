import React from "react";
import photo from './assets/photu.jpeg';
import { paragraphs, textBlocks } from "./helpers/utilities";
import Block from "./typography/Block";
import Heading from "./typography/Heading";
import Para from "./typography/Para";

const Home = () => {
  return (
    <div>
      <img src={photo} alt="Jaydeep with honda CB350" className="flex m-auto h-auto w-[70%] my-8 rotate-0 shadow-3xl hover:-rotate-2 transition duration-500 ease-in-out delay-100" ></img>
      <h1 className="font-heading text-4xl py-8 text-primary">{"Hey, I'm Jaydeep Godhani"}</h1>
      {paragraphs.aboutme.map((item, id) => <Para key={id}>{item}</Para>)}
      <Heading text={"Experience"} />
      {textBlocks.experience.map((item, id) => <Block key={id} header={item[0]} body={item[1]} footer={item[2]}/>)}
    </div>
  );
};

export default Home;
