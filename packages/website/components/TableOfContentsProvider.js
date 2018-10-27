import React, { Component, createContext } from "react";

const Context = createContext();

class TableOfContentsProvider extends Component {
  toc = [];

  addItem = ({ id, level, title }) => this.toc.push({ id, level, title });

  getItems = () => this.toc;

  render() {
    const { Provider } = Context;
    const { children } = this.props;

    return (
      <div>
        <Provider value={{ addItem: this.addItem, getItems: this.getItems }}>
          {children}
        </Provider>
      </div>
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
