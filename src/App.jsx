import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import PostsPage from "./PostsPage";
import Projects from "./Projects";
import Winnings from "./Winnings";
import { metadata } from "./helpers/metadata";
import BlogPost from "./typography/BlogPost";

function App() {

  return (
    <div className="w-screen flex justify-center bg-bg min-h-screen">
      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/winnings" element={<Winnings />} />
          <Route path="/posts" element={<PostsPage />} />
          {metadata.map((e,i) => <Route key={i} path={`/posts/${e.link}`} element={<BlogPost content={e.link} />} />)}
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
