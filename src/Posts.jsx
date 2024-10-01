import markdownContent2 from "./assets/posts/001.md?raw";
import ListPost from "./typography/ListPost";

const Posts = () => {
  console.log(markdownContent2);
  const allContent = [
    { title: "first post", date: "2024-10-01T08:52:15.486Z", tags: ["tag1", "tag2"] },
    { title: "second post", date: "2023-01-01T08:52:15.486Z", tags: ["tag2", "tag3"] },
    { title: "third post", date: "2023-06-01T08:52:15.486Z", tags: ["tag3", "tag1"] },
  ];
  return (
    <div>
      <ListPost content={allContent} />
    </div>
  );
};

export default Posts;
