import { combineReducers } from '../src/combineReducers';

describe('combineReducers', () => {
  it('should return an empty object if no reducers are passed', () => {
    const reducer = combineReducers();
    const state = reducer({});
    expect(state).toEqual({});
    expect(state).toMatchSnapshot();
  });

  it('should return the correct state if called', () => {
    const reducer = combineReducers({ test: () => ({ foo: 'bar' }) });
    const state = reducer({});
    expect(state).toEqual({ test: { foo: 'bar' } });
    expect(state).toMatchSnapshot();
  });
});
