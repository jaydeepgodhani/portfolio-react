import { useEffect, useState } from "react";
// import markdownContent2 from "./assets/posts/001.md?raw";
import { metadata } from "./helpers/metadata";
import { getMapOfTags } from "./helpers/utilities";
import PostList from "./typography/PostList";

const tagMap = getMapOfTags(metadata);

const checkSubset = (parentArray, subsetArray) => {
  return subsetArray.every((el) => {
      return parentArray.includes(el)
  })
}

const PostsPage = () => {
  // console.log(markdownContent2);
  const [content, setContent] = useState(metadata);
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
    if(filter.length === 0) setContent(metadata);
    else setContent(
      metadata.filter((obj) => {
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
      <PostList content={content} />
    </div>
  );
};

export default PostsPage;
