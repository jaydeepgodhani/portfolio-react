import React from "react";
import { dateToReadable, getMapOfPosts, getMapOfTags } from "../helpers/utilities";

const ListPost = ({ content }) => {
  const tagMap = getMapOfTags(content);
  const postMap = getMapOfPosts(content);

  return (
    <div>
      <h2 className="font-heading text-2xl py-6 text-primary">Tags</h2>
      {Object.keys(tagMap).map((e) => (
        <span
          key={e}
          className="py-1 px-2 mr-4 rounded-md bg-code-bg text-secondary text-sm"
        >
          {`${e} (${tagMap[e]})`}
        </span>
      ))}

      {Object.keys(postMap).map((e) => (
        <div key={e}>
          <h2 className="font-heading text-2xl py-6 text-primary">{e}</h2>
          {postMap[e].map((e) => (
            <div key={e.date} className="flex flex-row py-4">
              <div className="w-1/6 text-primary">{dateToReadable(e.date)}</div>
              <div className="w-5/6">
                <p className="pb-2 text-primary">{e.title}</p>
                {e.tags && e.tags.map((t) => (
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

export default ListPost;
