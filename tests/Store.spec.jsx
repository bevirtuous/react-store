import React from 'react';
import { mount } from 'enzyme';
import Store from '../src/Store';
import combineReducers from '../src/combineReducers';
import { useSelector } from '../src/hooks';
import { dispatch } from '../src/helpers';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const AppContent = () => {
  const count = useSelector(state => state.counter);

  return (
    <div>
      {count}
    </div>
  );
};

const App = () => (
  <Store reducer={combineReducers({ counter })}>
    <AppContent />
  </Store>
);

describe('<Store />', () => {
  it('should render', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html()).toEqual('<div>0</div>');
    expect(wrapper).toMatchSnapshot();
  });
});
