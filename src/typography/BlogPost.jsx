import React from 'react';
import ReactMarkdown from 'react-markdown';
import Para from './Para';

const BlogPost = ({ content }) => {
  return (
    <article>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className='font-heading text-3xl py-6 text-primary'>{children}</h1>,
          h2: ({ children }) => <h1 className='font-heading text-2xl py-6 text-primary'>{children}</h1>,
          h3: ({ children }) => <h1 className='font-heading text-xl py-6 text-primary'>{children}</h1>,
          p: ({ children }) => <Para>{children}</Para>,
          blockquote: ({ children }) => (
            <blockquote className='pl-4 border-l-4 bg-quote-bg border-primary py-1 my-1'>
              {children}
            </blockquote>
          ),
          code: (obj) => {
            console.log(obj);
            return !obj.className ? (
              <code className='py-1 px-2 rounded-md bg-code-bg text-secondary text-sm'>
                {obj.children}
              </code>
            ) : (
              <div className='py-4 px-4 rounded-md bg-code-bg text-secondary text-sm'>
                {String(obj.children).replace(/\n$/, '')}
              </div>
            )},
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