import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Link = styled('a')`
  ${({ active }) =>
    active &&
    css`
      border-left: 3px solid #38932c;
      font-weight: 700;
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
