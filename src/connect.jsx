import React from 'react';
import StoreContext from './context';

export default (mapStateToProps, mapDispatchToProps) => (
  Component => props => (
    <StoreContext.Consumer>
      {({ dispatch, getState }) => (
        <Component
          {...props}
          {...(mapStateToProps(getState(), props) || {})}
          {...(mapDispatchToProps(dispatch, props) || {})}
        />
      )}
    </StoreContext.Consumer>
  )
);
