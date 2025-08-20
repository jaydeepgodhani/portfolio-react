import photo from './assets/photu.webp';
import { paragraphs, textBlocks } from "./helpers/utilities";
import Block from "./typography/Block";
import Heading from "./typography/Heading";
import Para from "./typography/Para";

const Home = () => {
  return (
    <div className="animate-fade">
      <img src={photo} alt="Jaydeep with honda CB350" className="flex m-auto h-auto w-[70%] my-10 shadow-smooth transition duration-500 ease-in-out hover:scale-[1.02]" ></img>
      <h1 className="font-heading text-4xl py-8 text-primary">{"Hey, I'm Jaydeep Godhani"}</h1>
      {paragraphs.aboutme.map((item, id) => <Para key={id}>{item}</Para>)}
      <Heading text={"Experience"} />
      {textBlocks.experience.map((item, id) => <Block key={id} header={item[0]} body={item[1]} footer={item[2]}/>)}
    </div>
  );
};

export default Home;
