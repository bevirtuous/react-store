import React from 'react';
import { StoreContext } from './context';

export function connect(mapStateToProps, mapDispatchToProps) {
  return function withConnect(Component) {
    return function ConnectedComponent(props) {
      return (
        <StoreContext.Consumer>
          {({ dispatch, getState }) => (
            <Component
              {...props}
              {...(mapStateToProps(getState(), props) || {})}
              {...(mapDispatchToProps(dispatch, props) || {})}
            />
          )}
        </StoreContext.Consumer>
      );
    };
  };
}
