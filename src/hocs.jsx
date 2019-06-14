import React from 'react';
import StoreContext from './context';

/**
 * Injects the store's dispatch function into the component props.
 * @param {Function} Component The original component.
 * @returns {JSX.Element}
 */
export const withDispatch = Component => props => (
  <StoreContext.Consumer>
    {({ dispatch }) => <Component {...props} dispatch={dispatch} />}
  </StoreContext.Consumer>
);

/**
 * Injects the store properties into the component props.
 * @param {Function} Component The original component.
 * @returns {JSX.Element}
 */
export const withStore = Component => props => (
  <StoreContext.Consumer>
    {store => <Component {...props} {...store} />}
  </StoreContext.Consumer>
);
