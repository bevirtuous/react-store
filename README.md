# React Store &middot; [![Build Status](https://travis-ci.org/bevirtuous/react-store.svg?branch=master)](https://travis-ci.org/bevirtuous/react-store) [![Coverage Status](https://coveralls.io/repos/github/bevirtuous/react-store/badge.svg)](https://coveralls.io/github/bevirtuous/react-store) [![GitHub (pre-)release](https://img.shields.io/github/release/bevirtuous/react-store/all.svg)](https://github.com/bevirtuous/react-store/releases)

A very simple but reliable state container for ReactJS applications.

It helps you write React applications that store application state.
It replicates the way how [Redux](https://redux.js.org/) works and provides almost
the same mechanisms - but without Redux - all done in pure React
using [React's Context API](https://reactjs.org/docs/context.html).

It provides you with React Hooks and React HOCs for you to be able to easily
access the store functions and data you need.

## Installation

To install the stable version with **npm**:

```sh
npm install --save @virtuous/react-store
```

To install the stable version with **yarn**:

```sh
yarn add @virtuous/react-store
```

## Setup

The **React Store** follows the concepts of Redux. This means that the whole state of
your app is stored in an object tree inside a React Context.

The only way to change the state tree is to emit an action and then having a
reducer applying the changes to the store portion.

To get the store set up, you only need to wrap the store component around your
application components and pass in your reducer:

```js
import React from 'react';
import { Store, combineReducers } from '@virtuous/react-store';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineStore({ counter });

function App() {
  <Store reducer={rootReducer}>
    {/* Your application goes here */}
  </Store>
}
```

## Reducer

A reducer manipulates its own state in response to actions dispatched to the store. This follows
the same principles that are described in the original [Redux Documentation](https://redux.js.org/basics/reducers).

In the above example we see a very simple reducer, that increments or decrements the counter state.

## combineReducers()

**React Store** provides a `combineReducers` helper that lets you combine multiple reducers
together to a more complex state. It works in the exact same way as it is described
in the [Redux Documentation](https://redux.js.org/api/combinereducers).

## Dispatching actions

There is **four** (4) different ways that you can approach to dispatch an action.

You can use the `useDispatch()` React Hook:

```jsx
import { useDispatch } from '@virtuous/react-store';

function increment() {
  return {
    type: 'INCREMENT',
  };
}

function MyComponent() {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  /* Your component logic */
}
```

You can also use the `withDispatch()` HOC:

```jsx
import { withDispatch } from '@virtuous/react-store';

function increment() {
  return {
    type: 'INCREMENT',
  };
}

function MyComponent({ dispatch }) {
  function handleIncrement() {
    dispatch(increment());
  }

  /* Your component logic */
}

export default withDispatch(MyComponent);
```

You can use the `react-redux` approach of using the `connect` Higher Order Component (HOC):

```jsx
import { connect } from '@virtuous/react-store';

function MyComponent({ increment }) {
  /* Your component logic */
}

function increment() {
  return {
    type: 'INCREMENT',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch(increment()),
  };
}

export default connect(null, mapDispatchToProps)(MyComponent);
```
