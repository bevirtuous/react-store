# React Store &middot; [![Build Status](https://travis-ci.org/bevirtuous/react-store.svg?branch=master)](https://travis-ci.org/bevirtuous/react-store) [![Coverage Status](https://coveralls.io/repos/github/bevirtuous/react-store/badge.svg)](https://coveralls.io/github/bevirtuous/react-store) [![GitHub (pre-)release](https://img.shields.io/github/release/bevirtuous/react-store/all.svg)](https://github.com/bevirtuous/react-store/releases)

**React Store** is a very simple but reliable state container for
[React](https://reactjs.org) applications.

It helps you write React applications that store application state by replicating
the way how [Redux](https://redux.js.org/) works with almost
the same mechanisms - but completelly without Redux - all done in pure React
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

// A simple reducer.
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

There are multiple ways how you can dispatch an action with the **React Store**.

The easiest is the `dispatch()` helper, that lets you dispatch an action from
anywhere in your code:

```js
import { dispatch } from '@virtuous/react-store';

dispatch(increment({ type: 'INCREMENT' }));
```

You can use this helper anywhere. Even in React components. It does not to anything
else but the store.

If your code is based in React Hooks and you want to continue using this
paradigm, you can use the `useDispatch()` React Hook:

```jsx
import { useDispatch } from '@virtuous/react-store';

function MyComponent() {
  const dispatch = useDispatch();

  function increment() {
    dispatch({ type: 'INCREMENT' });
  }

  return (
    <button onClick={increment}>Increment</button>
  )
}
```

There are cases where it does not make sense to write a functional component. Or it is simply
not possible. For these rare cases, **React Store** provides the `withDispatch()` higher order component:

```jsx
import React from 'react';
import { withDispatch } from '@virtuous/react-store';

class MyComponent extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  render() {
    return (
      <button onClick={this.increment}>Increment</button>
    )
  }
}

export default withDispatch(MyComponent);
```

## Accessing store data

You might ask yourself "can I still use selectors with this tool?". The answer is **YES**.
[Reselect](https://github.com/reduxjs/reselect) is inspired and meant
to be used with Redux, but it is not directly connected to it. Therefore
the `state` and `props` arguments must not come from Redux. You could in
fact store the state completely by your own and still use reselect.

Let's discover the way, how you can access store data in **React Store**.

Again, the easiest way to do that, is to use the `select()` helper, that lets you access
data from anywhere in you codebase:

```js
import { createSelector } from 'reselect';
import { select } from '@virtuous/react-store';

const getCounter = createSelector(
  state => state.counter
);

const count = select(getCounter);
```

You can als use the React Hook to access data inside your functional component:

```jsx
import React from 'react';
import { useSelector } from '@virtuous/react-store';
import { createSelector } from 'reselect';

const getCounter = createSelector(
  state => state.counter
);

function MyComponent() {
  const count = useSelector(getCounter);

  return (
    // The component output.
  )
}
```

## connect()

We understand that is hard to refactor your codebase all at once. Maybe you made the decission
to switch from Redux to **React Store**, but you can't invest the time to get rid of everthing
related to Redux. Therefore **React Store** also provides you with its own implementation
of `react-redux`'s `connect()` Higher Order Component (HOC). We understand that it is very likely
that you use this module to connect your Redux store with your React application.

```jsx
import { createSelector } from 'reselect';
import { connect } from '@virtuous/react-store';

function MyComponent({ increment, decrement, counter }) {
  /* Your component logic */
}

const getCounter = createSelector(
  state => state.counter
);

function mapStateToProps(state) {
  return {
    counter: getCounter(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

> **REMEMBER**: We can not provide every functionality that the original `react-redux` module
> provides. Therefore the only two arguments the `connect()` HOC accepts,
> are `mapStateToProps` and `mapDispatchToProps`. It is only meant to help you migrate.
