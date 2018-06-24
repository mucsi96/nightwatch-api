import React, { Fragment } from 'react';
import { withDehydration } from './DehydrationProvider';

const InitialStateCollector = ({ initialStateKey, addToInitialState, ...props }) => {
  addToInitialState({ key: initialStateKey, props });
  return null;
};

const InitialStateCollectorContainer = withDehydration(InitialStateCollector);

const dehydrate = key => WrappedComponent => props => {
  return (
    <div data-react-rehydrate-key={key}>
      <InitialStateCollectorContainer initialStateKey={key} {...props} />
      <WrappedComponent {...props} />
    </div>
  );
};

export default dehydrate;
