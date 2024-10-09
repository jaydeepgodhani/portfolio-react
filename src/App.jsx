import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import PostsPage from "./PostsPage";
import Projects from "./Projects";
import Winnings from "./Winnings";
import BlogPost from "./typography/BlogPost";

function App() {
  const location = useLocation();
  const isSlugUrl = /^\/posts\/.+/; // do not show footer when on slug URL
  console.log("Base URL : ", import.meta.env.BASE_URL);

  return (
    <div className="w-screen flex justify-center bg-bg min-h-screen">
      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/winnings" element={<Winnings />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:slug" element={<BlogPost />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {!isSlugUrl.test(location.pathname) && <Footer />}
      </div>
    </div>
  );
}

export default App;
