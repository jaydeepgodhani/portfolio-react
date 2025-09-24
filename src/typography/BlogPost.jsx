import { useEffect, useLayoutEffect, useState } from "react";
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

const commonClassName = "text-secondary animate-fade";

const BlogPost = ({ sublink }) => {

  const [codeStyle, setCodeStyle] = useState(localStorage.theme === 'dark' ? materialDark : materialLight);
  const { slug } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 0);
    }
  }, [content]);

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

  window.addEventListener("storage", () => {
    if (localStorage.theme === DARK) setCodeStyle(materialDark);
    else setCodeStyle(materialLight);
  });

  const postAvailable = isPostAvailable(sublink, slug);

  if (!postAvailable) return <NoMatch />;

  if (!content) return <div className="text-primary py-12 text-xl">Loading...</div>

  return (
    <article className="animate-fade">
      <ReactMarkdown
        key={sublink}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <Header content={children} size="4xl" />,
          h2: ({ children }) => <Header content={children} size="3xl" />,
          h3: ({ children }) => <Header content={children} size="2xl" />,
          h4: ({ children }) => <Header content={children} size="xl" />,
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
            <b className={commonClassName}>{children}</b>
          ),
          ol: ({ children }) => (
            <ol
              style={{ listStyle: "decimal", paddingLeft: "2rem" }}
              className={commonClassName}
            >
              {children}
            </ol>
          ),
          ul: ({ children }) => (
            <ul
              style={{ listStyle: "disc", paddingLeft: "2rem" }}
              className={commonClassName}
            >
              {children}
            </ul>
          ),
          li: ({ children }) => <li className={commonClassName}>{children}</li>,
          table: ({ children }) => (
            <table className="text-secondary border-[2px] w-full animate-fade">
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead className={commonClassName}>{children}</thead>
          ),
          tbody: ({ children }) => (
            <thead className={commonClassName}>{children}</thead>
          ),
          tr: ({ children }) => (
            <tr className="text-secondary border-b-[2px] animate-fade">
              {children}
            </tr>
          ),
          th: ({ children }) => <th className={commonClassName}>{children}</th>,
          td: ({ children }) => (
            <td className="text-secondary py-2 px-2 align-top animate-fade">
              {children}
            </td>
          ),
          hr: () => <hr className="text-secondary" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogPost;
