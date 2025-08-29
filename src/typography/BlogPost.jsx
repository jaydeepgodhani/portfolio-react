import { useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import NoMatch from "../NoMatch";
import { isPostAvailable } from "../helpers/utilities";
import Para from "./Para";

const BlogPost = ({ sublink }) => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const postAvailable = isPostAvailable(sublink, slug);

  useLayoutEffect(() => {
    const fetchFileContent = async () => {
      const path = `/${sublink}/${slug}.md`;
      const response = await fetch(path);
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      } else {
        console.error("Failed to load markdown file:", response.status);
      }
    };
    fetchFileContent();
  }, [slug, sublink]);

  if (!postAvailable) return <NoMatch />;

  return (
    <article className="animate-fade">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          h4: ({ children }) => (
            <h5 className="font-heading text-l py-6 text-primary">
              {children}
            </h5>
          ),
          p: ({ children }) => <Para>{children}</Para>,
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 bg-quote-bg border-primary py-1 my-1">
              {children}
            </blockquote>
          ),
          code: (obj) => {
            const { children, className, node, ...rest } = obj;
            const match = /language-(\w+)/.exec(className || "");
            console.log("match... ", match);

            return !obj.className ? (
              <code className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre">
                {obj.children}
              </code>
            ) : match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                className="py-4 px-4 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre-wrap"
                language={match[1]}
                style={dark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <div className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre">
                {String(children).replace(/\n$/, "")}
              </div>
            );
          },
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <b className="text-secondary">{children}</b>
          ),
          ol: ({ children }) => (
            <ul
              style={{ listStyle: "decimal", paddingLeft: "2rem" }}
              className="text-secondary"
            >
              {children}
            </ul>
          ),
          ul: ({ children }) => <ul className="text-secondary">{children}</ul>,
          li: ({ children }) => <li className="text-secondary">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogPost;
