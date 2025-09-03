import { emailSVG, githubSVG, leetcodeSVG, linkedInSVG, twitterSVG } from "./helpers/utilities";

const Footer = () => {
  // const dotLottieRef = useRef(null);

  // const handleMouseEnter = () => {
  //   if (dotLottieRef.current) {
  //     dotLottieRef.current.play();
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (dotLottieRef.current) {
  //     dotLottieRef.current.pause();
  //   }
  // };

  return (
    <footer className="pt-6">
      {/* <Heading text={"Contact"} />
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
      </Para> */}
      <div className="flex justify-center mt-16 text-primary text-2xl">
        <a
          href="mailto:jaydeepgodhani16@gmail.com"
          className="mx-3 text-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={emailSVG}></path>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/jaydeepgodhani"
          className="mx-3 text-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={linkedInSVG}></path>
          </svg>
        </a>
        <a
          href="https://www.github.com/in/jaydeepgodhani"
          className="mx-3 text-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={githubSVG}></path>
          </svg>
        </a>
        <a
          href="https://www.x.com/jaydeepgodhani"
          className="mx-3 text-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={twitterSVG}></path>
          </svg>
        </a>
        <a
          href="https://www.leetcode.com/jaydeepgodhani"
          className="mx-3 text-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={leetcodeSVG}></path>
          </svg>
        </a>
      </div>
      <div className="flex justify-center my-8 text-primary">
        <a className="mx-3 text-primary" href="https://godhani.in">
          © Jaydeep Godhani
        </a>
        |
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          className="mx-3 text-primary"
        >
          CC BY-NC 4.0
        </a>
      </div>
      {/* <div className="flex justify-center mt-16 text-primary transition-all duration-1000 text-xs">
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
        </div> */}
    </footer>
  );
};

export default Footer;