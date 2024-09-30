import markdownContent2 from './assets/posts/001.md?raw';
import BlogPost from "./typography/BlogPost";

const Posts = () => {

  console.log(markdownContent2);
  return (
    <div>
      <BlogPost content={markdownContent2} />
    </div>
  )
}

export default Posts