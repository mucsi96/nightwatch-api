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
    const { level, children, className, activeItemId } = this.props;

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
          .map(({ id, level, title, children }) => (
            <TableOfContentsNode
              key={id}
              id={id}
              level={level}
              title={title}
              activeItemId={activeItemId}
            >
              {children}
            </TableOfContentsNode>
          ))}
      </ol>
    );
  }

  render() {
    const { id, title, activeItemId } = this.props;

    if (id) {
      return (
        <li>
          <Link href={`#${id}`} active={activeItemId === id}>
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
