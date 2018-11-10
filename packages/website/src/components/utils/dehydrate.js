import React from 'react';
import { withDehydration } from './DehydrationProvider';

const InitialStateCollector = ({ initialStateKey, addToInitialState, ...props }) => {
  addToInitialState({ key: initialStateKey, props });
  return null;
};

const InitialStateCollectorContainer = withDehydration(InitialStateCollector);

const dehydrate = key => WrappedComponent => ({ className, innerClassName, ...props }) => {
  return (
    <div data-react-rehydrate-key={key} className={className}>
      <InitialStateCollectorContainer initialStateKey={key} {...props} />
      <WrappedComponent className={innerClassName} {...props} />
    </div>
  );
};

export default dehydrate;
