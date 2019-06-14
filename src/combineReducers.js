const combineReducers = reducers => (
  (state = {}, action) => (
    Object.keys(reducers).reduce((nextState, key) => {
      // eslint-disable-next-line no-param-reassign
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {})
  )
);

export default combineReducers;
