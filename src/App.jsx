import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import Projects from "./Projects";
import Winnings from "./Winnings";
import { themeSwitcher } from "./helpers/utilities";

function App() {
  useEffect(() => themeSwitcher(false), []);

  return (
    <div className="w-screen flex justify-center bg-bg min-h-screen">
      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/winnings" element={<Winnings />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
