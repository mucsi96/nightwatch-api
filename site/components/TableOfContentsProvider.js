import React, { Component, createContext } from 'react';

export const Context = createContext('TableOfContents');

class TableOfContentsProvider extends Component {
  toc = [];

  render() {
    const { Provider } = Context;
    const { children } = this.props;

    return (
      <div>
        <Provider
          value={{
            addItem: ({ id, level, title }) => this.toc.push({ id, level, title }),
            getItems: () => this.toc
          }}
        >
          {children}
        </Provider>
      </div>
    );
  }
}

export default TableOfContentsProvider;
