import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import Projects from "./Projects";
import Winnings from "./Winnings";

function App() {
  return (
    <div className="w-screen flex justify-center bg-bg">
      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Navbar />
        <Routes>
          <Route path="/porfolio-react" element={<Home />} />
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
