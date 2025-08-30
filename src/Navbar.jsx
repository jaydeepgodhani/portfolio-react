import { useEffect, useState } from "react";
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
    <div className="w-screen sticky top-0 backdrop-opacity-97 backdrop-blur-[10px] z-10">
      <div className="flex items-center flex-row justify-center">
        <div></div>
        <div className="2xl:w-1/2 lg:w-3/4 py-6 px-4">
          <nav>
            <ul className="w-full flex flex-col text-xl items-center lg:flex-row">
              <li className="lg:w-[50%] xl:w-[60%] 2xl:w-[50%]">
                <NavLink
                  to="/"
                  className="border-b-0 no-underline shadow-none hover:shadow-none text-primary"
                >
                  {time}
                </NavLink>
              </li>
              <div className="flex flex-row w-full mt-3 justify-center lg:mt-0 lg:w-[50%] xl:w-[40%] 2xl:w-[50%]">
                <li className="mx-4">
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Projects
                  </NavLink>
                </li>
                <li className="mx-4">
                  <NavLink
                    to="/winnings"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Winnings
                  </NavLink>
                </li>
                <li className="mx-4">
                  <NavLink
                    to="/posts"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Posts
                  </NavLink>
                </li>
                <li className="mx-4">
                  <NavLink
                    to="/knowledge"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Knowledge
                  </NavLink>
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
                    <div className="bg-primary w-3 h-3 relative text-center rotate-[20deg]"></div>
                    <div className="bg-primary w-3 h-3 absolute text-center rotate-[155deg]"></div>
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </div>
      <hr className="w-full text-secondary border-[1px]" />
    </div>
  );
};

export default Navbar;
