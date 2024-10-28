import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const ContentfulRichText = ({ content }: { content: any }) => {
  // Custom options for rendering different node types
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
      [MARKS.CODE]: (text) => (
        <code className="bg-gray-100 p-1 rounded">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl font-bold mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-bold mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl font-bold mb-2">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc ml-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal ml-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-6 border-t border-gray-300" />,
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { url, title, description, width, height } =
          node.data.target.fields;
        return (
          <img
            src={url}
            alt={description || title}
            className="max-w-full h-auto my-4"
            style={{ maxWidth: width, height: "auto" }}
          />
        );
      },
    },
  };

  return (
    <div className="rich-text-content">
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default ContentfulRichText;
