/**
 * Combines an object of many reducers to one new higher order reducer.
 * @param {Object} reducers An object of multiple reducers.
 * @returns {Function} A new higher order reducer that unifies all the others.
 */
export function combineReducers(reducers = {}) {
  return (state = {}, action) => (
    Object.keys(reducers).reduce((nextState, key) => {
      // eslint-disable-next-line no-param-reassign
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {})
  );
}
