import { useContext } from 'react';
import StoreContext from './context';

/**
 * Returns the global application store's **dispatch** function.
 * @returns {Function} The global dispatch function.
 */
export const useDispatch = () => {
  const { dispatch } = useContext(StoreContext);

  return dispatch;
};

/**
 * Takes a **selector** and returns its output value.
 * @param {Function} selector The selector to exectue.
 * @param {Object} [props] Some component props to pass to the selector.
 * @returns {*} The output value of the selector.
 */
export const useSelector = (selector, props = undefined) => {
  const { getState } = useContext(StoreContext);

  return selector(getState(), props);
};

/**
 * Returns an instance of the store.
 * @returns {Object} The application store.
 */
export const useStore = () => {
  const store = useContext(StoreContext);

  return store;
};
