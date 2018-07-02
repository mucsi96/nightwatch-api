import React, { Component } from 'react';

class TableOfContentsNode extends Component {
  renderChildren() {
    const { level, children, className } = this.props;

    if (!children.length) {
      return null;
    }

    return (
      <ul className={className}>
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
            <TableOfContentsNode key={id} id={id} level={level} title={title}>
              {children}
            </TableOfContentsNode>
          ))}
      </ul>
    );
  }

  render() {
    const { id, title } = this.props;

    if (id) {
      return (
        <li>
          <a href={`#${id}`} onClick={() => window.alert('asdasda')}>
            {title}
          </a>
          {this.renderChildren()}
        </li>
      );
    }

    return this.renderChildren();
  }
}

export default TableOfContentsNode;