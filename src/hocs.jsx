import React from 'react';
import { StoreContext } from './context';

/**
 * Injects the store's dispatch function into the component props.
 * @param {Function} Component The original component.
 * @returns {Function}
 */
export function withDispatch(Component) {
  return function WithDispatch(props) {
    return (
      <StoreContext.Consumer>
        {({ dispatch }) => <Component {...props} dispatch={dispatch} />}
      </StoreContext.Consumer>
    );
  };
}

/**
 * Injects the store properties into the component props.
 * @param {Function} Component The original component.
 * @returns {Function}
 */
export function withStore(Component) {
  return function WithStore(props) {
    return (
      <StoreContext.Consumer>
        {store => <Component {...props} {...store} />}
      </StoreContext.Consumer>
    );
  };
}
