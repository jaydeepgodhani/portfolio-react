import { useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import NoMatch from "../NoMatch";
import materialDark from "../helpers/material-dark";
import materialLight from "../helpers/material-light";
// import { a11yOneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DARK, isPostAvailable } from "../helpers/utilities";
import CodeBlock from "./CodeBlock";
import Header from "./Header";
import Para from "./Para";

const BlogPost = ({ sublink }) => {
  const [codeStyle, setCodeStyle] = useState(localStorage.theme);
  window.addEventListener("storage", () => {
    if (localStorage.theme === DARK) setCodeStyle(materialDark);
    else setCodeStyle(materialLight);
  });

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
          h1: ({ children }) => <Header content={children} />,
          h2: ({ children }) => <Header content={children} />,
          h3: ({ children }) => <Header content={children} />,
          h4: ({ children }) => <Header content={children} />,
          p: ({ children }) => <Para>{children}</Para>,
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 bg-quote-bg border-primary py-1 my-1 animate-fade">
              {children}
            </blockquote>
          ),
          code: (obj) => <CodeBlock obj={obj} codeStyle={codeStyle} />,
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
          table: ({ children }) => (
            <table className="text-secondary border-[2px] w-full">
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead className="text-secondary">{children}</thead>
          ),
          tbody: ({ children }) => (
            <thead className="text-secondary">{children}</thead>
          ),
          tr: ({ children }) => (
            <tr className="text-secondary border-b-[2px]">{children}</tr>
          ),
          th: ({ children }) => <th className="text-secondary">{children}</th>,
          td: ({ children }) => (
            <td className="text-secondary py-2 px-2 align-top">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogPost;
