import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
// import Knowledge from "./Knowledge";
import Navbar from "./Navbar";
// import NoMatch from "./NoMatch";
// import PostsPage from "./PostsPage";
import { lazy, Suspense } from "react";
import Projects from "./Projects";
import Winnings from "./Winnings";
// import BlogPost from "./typography/BlogPost";
const BlogPost = lazy(() => import("./typography/BlogPost"));
const PostsPage = lazy(() => import("./PostsPage"));
const Knowledge = lazy(() => import("./Knowledge"));
const NoMatch = lazy(() => import("./NoMatch"));

function App() {
  return (
    <div className="w-screen flex bg-bg min-h-screen flex-col items-center">
      <Navbar />

      <div className="2xl:w-1/2 px-4 lg:w-3/4">
        <Suspense
          fallback={
            <div className="text-primary py-12 text-xl animate-fade">Loading...</div>
          }
        >
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
            <Route
              path="/posts/:slug"
              element={<BlogPost sublink={"posts"} />}
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default App;
