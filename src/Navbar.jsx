import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DARK, LIGHT, showTime, themeSwitcher } from "./helpers/utilities";

const Navbar = () => {
  const [time, setTime] = useState(showTime());

  const toggleTheme = () => {
    themeSwitcher(localStorage.theme === DARK ? LIGHT : DARK);
  };

  useEffect(() => {
    themeSwitcher(localStorage.theme);
    const timer = setInterval(() => {
      setTime(showTime());
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="py-6 sticky top-0 backdrop-opacity-95 backdrop-blur-xs z-10">
      <ul className="w-full flex flex-col font-bold text-2xl items-center lg:flex-row">
        <li className="lg:w-[50%] xl:w-[60%] 2xl:w-[50%]">
          <NavLink to="/" className="border-b-0 no-underline shadow-none hover:shadow-none">
            {time}
          </NavLink>
        </li>
        <div className="flex flex-row w-full mt-3 justify-center lg:mt-0 lg:w-[50%] xl:w-[40%] 2xl:w-[50%]">
          <li className="mx-4">
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li className="mx-4">
            <NavLink to="/winnings">Winnings</NavLink>
          </li>
          <li>
            <button
              onMouseDown={toggleTheme}
              className="w-auto h-full flex items-center justify-center cursor-pointer mx-3 text-3xl"
            >
              {/* <svg className="h-6 w-full m-2 text-primary" viewBox="0 0 24 24">
                <desc>Theme Switcher Icon</desc>
                <g fill="currentColor">
                  <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"></path>
                </g>
              </svg> */}
              <div className="bg-primary w-4 h-4 relative text-center rotate-[20deg] before:content-* before:absolute before:top-0 before:left-0 before:h-4 before:w-4 before:bg-primary before:rotate-[135deg]"></div>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
