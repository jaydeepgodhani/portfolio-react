import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRef } from "react";
import catPlaying from './assets/cat_playing.lottie';
import Heading from "./typography/Heading";
import Para from "./typography/Para";

const Footer = () => {
  const dotLottieRef = useRef(null);

  const handleMouseEnter = () => {
    if (dotLottieRef.current) {
      dotLottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (dotLottieRef.current) {
      dotLottieRef.current.pause();
    }
  };

  return (
    <footer className="pt-6 animate-fade">
      <Heading text={"Contact"} />
      <Para>
        Feel free to reach me at{" "}
        <a className="special" href="mailto:jaydeepgodhani16@gmail.com">
          jaydeepgodhani16@gmail.com
        </a>
      </Para>
      <Para>
        You can also find me on{" "}
        <a className="special" href="https://www.twitter.com/jaydeepgodhani">
          Twitter
        </a>
        ,{" "}
        <a
          className="special"
          href="https://www.linkedin.com/in/jaydeepgodhani"
        >
          LinkedIn
        </a>
        , and{" "}
        <a className="special" href="https://www.leetcode.com/jaydeepgodhani">
          LeetCode
        </a>
      </Para>
      {/* <div className="flex justify-center my-16 text-primary transition-all duration-1000 text-xs">
        {"⬥ ⬥ ⬥"}
      </div> */}
      <div className="flex justify-center mt-16 text-primary transition-all duration-1000 text-xs">
        <div
          className="w-1/3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DotLottieReact
            src={catPlaying}
            loop={false}
            autoplay={false}
            dotLottieRefCallback={(dotLottie) => {
              dotLottieRef.current = dotLottie;
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;