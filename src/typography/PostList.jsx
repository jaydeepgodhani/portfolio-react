import React from "react";
import { Link } from "react-router-dom";
import { dateToReadable, getMapOfPosts } from "../helpers/utilities";

const PostList = ({ content }) => {
  const postMap = getMapOfPosts(content);
  const years = [...postMap.keys()];

  return (
    <div>
      {years.map((year) => (
        <div key={year}>
          <h2 className="font-heading text-2xl py-6 text-primary">{year}</h2>
          {postMap.get(year).map((obj) => (
            <div key={obj.date} className="flex flex-row py-4">
              <div className="w-1/6 text-primary">{dateToReadable(obj.date)}</div>
              <div className="w-auto">
                <Link to={`/posts/${obj.link}`} className="shadow-none hover:shadow-none bg-quote-bg block mb-2 text-primary transition-all">{obj.title}</Link>
                {obj.tags &&
                  obj.tags.map((t) => (
                    <span
                      key={t}
                      className="py-1 px-2 mr-4 rounded-md bg-code-bg text-secondary text-sm"
                    >
                      {t}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostList;
