import React from "react";
import Heading from "./typography/Heading";
import Para from "./typography/Para";

const Footer = () => {

  return (
    <div className="pt-6 animate-fade">
      <Heading text={"Contact"} />
      <Para>
        Feel free to reach me at{" "}
        <a href="mailto:jaydeepgodhani16@gmail.com">
          jaydeepgodhani16@gmail.com
        </a>
      </Para>
      <Para>
        You can also find me on{" "}
        <a href="https://www.twitter.com/jaydeepgodhani">Twitter</a>,{" "}
        <a href="https://www.linkedin.com/in/jaydeepgodhani">LinkedIn</a>, and{" "}
        <a href="https://www.leetcode.com/jaydeepgodhani">LeetCode</a>
      </Para>
      <div className="flex justify-center my-16 text-primary transition-all duration-1000 text-xs">{'⬥ ⬥ ⬥'}</div>

    </div>
  );
};

export default Footer;
