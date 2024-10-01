import { useEffect, useState } from "react";
// import markdownContent2 from "./assets/posts/001.md?raw";
import { getMapOfTags } from "./helpers/utilities";
import ListPost from "./typography/ListPost";

const allContent = [
  {
    title: "first post",
    date: "2024-10-01T08:52:15.486Z",
    tags: ["tag1", "tag2"],
  },
  {
    title: "second post",
    date: "2023-01-01T08:52:15.486Z",
    tags: ["tag2", "tag3"],
  },
  {
    title: "third post",
    date: "2023-06-01T08:52:15.486Z",
    tags: ["tag3", "tag1"],
  },
];

const tagMap = getMapOfTags(allContent);

const checkSubset = (parentArray, subsetArray) => {
  return subsetArray.every((el) => {
      return parentArray.includes(el)
  })
}

const Posts = () => {
  // console.log(markdownContent2);
  const [content, setContent] = useState(allContent);
  const [filter, setFilter] = useState([]);

  const filterTags = (e) => {
    const tagName = e.target.innerHTML;
    const tagClasses = e.target.classList;
    if (!filter.includes(tagName)) {
      tagClasses.add("shadow-3xl");
      tagClasses.remove("bg-code-bg");
      setFilter([...filter, tagName]);
    } else {
      tagClasses.remove("shadow-3xl");
      tagClasses.add("bg-code-bg");
      setFilter(filter.filter((a) => a != tagName));
    }
  };

  useEffect(() => {
    if(filter.length === 0) setContent(allContent);
    else setContent(
      allContent.filter((obj) => {
        if (checkSubset(obj.tags, filter)) return true;
        else return false;
      })
    );
  }, [filter])

  return (
    <div>
      <h2 className="font-heading text-2xl py-6 text-primary">Tags</h2>
      <div className="mb-4">
        {Object.keys(tagMap).map((e) => (
          <span
            key={e}
            className="py-1 px-2 mr-4 rounded-md bg-code-bg text-secondary text-sm cursor-pointer"
            onClick={filterTags}
          >
            {e}
          </span>
        ))}
      </div>
      <ListPost content={content} />
    </div>
  );
};

export default Posts;
