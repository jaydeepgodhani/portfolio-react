import { useState } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi"; // for icons
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
    <code className="py-1 px-2 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre">
      {children}
    </code>
  ) : match ? (
    <div className="relative animate-fade">
      <button
        className="absolute top-2 right-2 p-1 text-secondary rounded hover:pointer z-[2]"
        onClick={handleCopy}
        title="Copy"
      >
        {copied ? <FiCheck className="text-green-500" /> : <FiClipboard />}
      </button>
      <SyntaxHighlighter
        {...rest}
        key={localStorage.theme + 'documentId'}
        PreTag="div"
        className="py-4 px-4 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre-wrap"
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