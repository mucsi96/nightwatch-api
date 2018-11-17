import React, { Component, createContext } from 'react';

const Context = createContext();

class TableOfContentsProvider extends Component {
  toc = [];

  addItem = ({ url, level, title }) => this.toc.push({ url, level, title });

  getItems = () => this.toc;

  render() {
    const { Provider } = Context;
    const { children } = this.props;

    return (
      <Provider value={{ addItem: this.addItem, getItems: this.getItems }}>{children}</Provider>
    );
  }
}

export const withTableOfContents = WrappedComponent => props => {
  const { Consumer } = Context;
  return (
    <Consumer>
      {({ getItems, addItem }) => (
        <WrappedComponent
          {...props}
          tableOfContentsItems={getItems()}
          addTableOfContentsItem={addItem}
        />
      )}
    </Consumer>
  );
};

export default TableOfContentsProvider;
