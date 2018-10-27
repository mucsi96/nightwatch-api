import React from "react";
import Markdown from "react-markdown";
import Heading from "../components/Heading";
import Link from "../components/Link";
import Code from "../components/Code";
import Image from "../components/Image";
import InlineCode from "../components/InlineCode";
import Emoji from "../components/Emoji";
import Paragraph from "./Paragraph";
import Contributors from "./Contributors";

const EMOJI_MAP_REGEX = /<--EMOJI-MAP--(.*)--EMOJI-MAP-->/;

const Article = ({ markdown }) => {
  const emojiMap = JSON.parse(EMOJI_MAP_REGEX.exec(markdown)[1]);

  return (
    <article>
      <Markdown
        escapeHtml={true}
        source={markdown.replace(EMOJI_MAP_REGEX, "")}
        renderers={{
          heading: Heading,
          link: ({ href, children }) => {
            if (href === "#contributors") {
              return <Contributors />;
            }
            if (href === "#emoji") {
              return <Emoji svg={emojiMap[children]} />;
            }
            return <Link href={href}>{children}</Link>;
          },
          inlineCode: InlineCode,
          code: Code,
          image: Image,
          paragraph: Paragraph
        }}
      />
    </article>
  );
};

export default Article;
