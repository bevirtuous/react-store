import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StoreContext from './context';
import isPlainObject from './utils/isPlainObject';
import { emitter, STORE_DISPATCH } from './events';

export const storeData = {
  store: null,
};

/**
 * Creates a store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 */
export default class Store extends PureComponent {
  static propTypes = {
    /**
     * This usually represents your application contents. Everything that should be covered by
     * the store, should be a child or part of a child of the Store component.
     */
    children: PropTypes.node.isRequired,
    /**
     * A function that returns the next state tree, given the
     * current state tree and the action to handle.
     */
    reducer: PropTypes.func.isRequired,
    /**
     * The initial state. You may optionally specify it to hydrate the state from the server in
     * universal apps, or to restore a previously serialized user session. If you use
     * `combineReducers` to produce the root reducer function, this must be an object with
     * the same shape as `combineReducers` keys.
     */
    initialState: PropTypes.shape(),
    /**
     * An array of functions that extend the dispatch function. Note that each middleware
     * will be given the `dispatch` and `getState` functions as named arguments.
     */
    middlewares: PropTypes.arrayOf(PropTypes.func),
  }

  static defaultProps = {
    initialState: undefined,
    middlewares: [],
  }

  isDispatching = false;

  /**
   * @param {Object} props  The component props.
   */
  constructor(props) {
    super(props);

    this.state = props.reducer(props.initialState, {});
    storeData.store = this.applyMiddleware(props.middlewares);
    emitter.addListener(STORE_DISPATCH, this.dispatch);
  }

  componentDidMount() {
    // Initialize the store.
    this.dispatch({ type: '@@INIT' });
  }

  componentWillUnmount() {
    // Remove the dispatch listener.
    emitter.removeListener(STORE_DISPATCH, this.dispatch);
  }

  /**
   * Creates a store enhancer that applies middleware to the dispatch method
   * of the Redux store. This is handy for a variety of tasks, such as expressing
   * asynchronous actions in a concise manner, or logging every action payload.
   * @param {Function[]} middlewares A collection of middlewares.
   * @returns {Object} The enhanced store.
   */
  applyMiddleware = (middlewares) => {
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. '
        + 'Other middleware would not be applied to this dispatch.'
      );
    };

    const middlewareAPI = {
      getState: this.getState,
      dispatch: (...args) => dispatch(...args),
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = this.compose(...chain)(this.dispatch);

    return {
      getState: this.getState,
      dispatch,
    };
  }

  /**
   * Composes single-argument functions from right to left. The rightmost
   * function can take multiple arguments as it provides the signature for
   * the resulting composite function.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing the argument functions
   * from right to left. For example, compose(f, g, h) is identical to doing
   * (...args) => f(g(h(...args))).
   */
  compose = (...funcs) => {
    if (funcs.length === 0) {
      return arg => arg;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   * @param {Object} action A plain object representing "what changed". An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   * @returns {Object} The new state.
   */
  dispatch = (action) => {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. '
        + 'Use custom middleware for async actions.'
      );
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. '
        + 'Have you misspelled a constant?'
      );
    }

    if (this.isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    const { reducer } = this.props;
    const { state } = this;

    this.isDispatching = true;

    const newState = reducer(state, action);

    this.setState(newState);
    this.isDispatching = false;

    return newState;
  }

  /**
   * Returns the state tree managed by the store.
   * @returns {Object} The current state tree of your application.
   */
  getState = () => this.state

  /**
   * @returns {JSX.Element}
   */
  render() {
    const { children } = this.props;

    return (
      <StoreContext.Provider value={storeData.store}>
        {children}
      </StoreContext.Provider>
    );
  }
}
