import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { showTime, themeSwitcher } from "./helpers/utilities";

const Navbar = () => {
  const [time, setTime] = useState(showTime());

  const toggleTheme = () => {
    themeSwitcher();
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      localStorage.theme = "dark";
    else localStorage.theme = "light";

    const timer = setInterval(() => {
      setTime(showTime());
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="py-8">
      <ul className="w-full flex flex-col font-bold text-2xl items-center lg:flex-row">
        <li className="lg:w-[50%] xl:w-[60%] 2xl:w-[50%]">
          <NavLink to="/portfolio-react" className="border-b-0">
            {time}
          </NavLink>
        </li>
        <div className="flex flex-row w-full mt-6 justify-center lg:mt-0 lg:w-[50%] xl:w-[40%] 2xl:w-[50%]">
          <li className="mx-4">
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li className="mx-4">
            <NavLink to="/winnings">Winnings</NavLink>
          </li>
          <li className="">
            <button
              onMouseDown={toggleTheme}
              className="w-auto h-full flex items-center justify-center cursor-pointer"
            >
              <svg className="h-6 w-full m-2 text-primary" viewBox="0 0 24 24">
                <desc>Theme Switcher Icon</desc>
                <g fill="currentColor">
                  <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"></path>
                </g>
              </svg>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
