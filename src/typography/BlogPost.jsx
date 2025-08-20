import { useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import NoMatch from "../NoMatch";
import { isPostAvailable } from "../helpers/utilities";
import Para from "./Para";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const postAvailable = isPostAvailable(slug);

  useLayoutEffect(() => {
    const fetchFileContent = async () => {
      const path = `/posts/${slug}.md`;
      const response = await fetch(path);
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      } else {
        console.error("Failed to load markdown file:", response.status);
      }
    };
    fetchFileContent();
  }, [slug]);

  if (!postAvailable) return <NoMatch />;

  return (
    <article className="animate-fade">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h2 className="font-heading text-3xl py-6 text-primary">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="font-heading text-2xl py-6 text-primary">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="font-heading text-xl py-6 text-primary">
              {children}
            </h4>
          ),
          p: ({ children }) => <Para>{children}</Para>,
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 bg-quote-bg border-primary py-1 my-1">
              {children}
            </blockquote>
          ),
          code: (obj) => {
            return !obj.className ? (
              <code className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm">
                {obj.children}
              </code>
            ) : (
              <div className="py-4 px-4 rounded-md bg-code-bg text-secondary text-sm">
                {String(obj.children).replace(/\n$/, "")}
              </div>
            );
          },
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogPost;
