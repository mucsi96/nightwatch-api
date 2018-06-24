import React, { Fragment } from 'react';
import { withDehydration } from './DehydrationProvider';

const InitialStateCollector = ({ initialStateKey, addToInitialState, ...props }) => {
  addToInitialState({ key: initialStateKey, props });
  return null;
};

const InitialStateCollectorContainer = withDehydration(InitialStateCollector);

const dehydrate = key => WrappedComponent => props => {
  return (
    <Fragment>
      <InitialStateCollectorContainer initialStateKey={key} {...props} />
      <WrappedComponent {...props} data-react-rehydrate-key={key} />
    </Fragment>
  );
};

export default dehydrate;
