import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Link = styled('a')`
  color: inherit;
  text-decoration: none;
  display: block;
  padding: 10px;
  position: relative;

  @media (min-width: 720px) {
    padding: 5px 10px;
  }

  transition: filter 0.1s linear;
  :hover {
    filter: invert(50%);
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: 700;
      :before {
        background-color: currentColor;
        display: block;
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: -10px;
        width: 3px;
      }
    `};
`;

class TableOfContentsNode extends Component {
  renderChildren() {
    const { level, children, className, activeUrl } = this.props;

    if (!children.length) {
      return null;
    }

    return (
      <ol className={className}>
        {children
          .reduce((acc, child) => {
            if (child.level === level + 1) {
              return [...acc, { ...child, level: level + 1, children: [] }];
            }
            const prev = [...acc];
            const last = prev.pop();
            return [...prev, { ...last, children: [...last.children, child] }];
          }, [])
          .map(({ url, level, title, children }) => (
            <TableOfContentsNode
              key={url}
              url={url}
              level={level}
              title={title}
              activeUrl={activeUrl}
            >
              {children}
            </TableOfContentsNode>
          ))}
      </ol>
    );
  }

  render() {
    const { url, title, activeUrl } = this.props;

    if (url) {
      return (
        <li>
          <Link href={url} active={activeUrl === url}>
            {title}
          </Link>
          {this.renderChildren()}
        </li>
      );
    }

    return this.renderChildren();
  }
}

export default TableOfContentsNode;
