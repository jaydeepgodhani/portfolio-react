import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ obj, codeStyle }) => {
  const [copied, setCopied] = useState(false);
  const { children, className, ...rest } = obj;
  const match = /language-(\w+)/.exec(className || "");
  const content = String(children).replace(/\n$/, "");
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return !className ? (
    <code className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre animate-fade">
      {children}
    </code>
  ) : match ? (
    <div className="relative animate-fade">
      <button
        className="absolute top-2 right-2 p-1 text-secondary rounded hover:pointer z-[2]"
        onClick={handleCopy}
        title="Copy"
      >
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            width={16}
            height={16}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            width={16}
            height={16}
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
          </svg>
        )}
      </button>
      <SyntaxHighlighter
        {...rest}
        key={localStorage.theme + "documentId"}
        PreTag="div"
        className="py-4 px-4 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre-wrap animate-fade"
        language={match[1]}
        style={codeStyle}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  ) : (
    <div className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre">
      {content}
    </div>
  );
};

export default CodeBlock;