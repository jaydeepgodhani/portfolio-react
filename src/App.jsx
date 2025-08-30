import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Knowledge from "./Knowledge";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import PostsPage from "./PostsPage";
import Projects from "./Projects";
import Winnings from "./Winnings";
import BlogPost from "./typography/BlogPost";

function App() {
  return (
    <div className="w-screen flex bg-bg min-h-screen flex-col items-center">
      <Navbar />

      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/winnings" element={<Winnings />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route
            path="/knowledge/:slug"
            element={<BlogPost sublink={"knowledge"} />}
          />
          <Route path="/posts/:slug" element={<BlogPost sublink={"posts"} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
