import React from 'react';

export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface State {
  [prop: string]: any;
}

export interface Dispatch {
  (action: AnyAction, ...extraArgs: any[]): State
}

export interface Reducer {
  (state: State, action: AnyAction): State
}

export interface CombinedReducers {
  [reducer: string]: Reducer;
}

export interface GetState {
  (): State;
}

export interface ReactStore {
  dispatch: Dispatch;
  getState: GetState;
  action?: AnyAction;
  __state?: State;
}

export interface StoreData {
  store: ReactStore;
}

export interface StoreProps {
  children: React.ReactNode;
  reducer: Reducer;
  initialState?: State;
  middlewares?: Function[];
}

/**
 * Creates a store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 */
export function Store(props: StoreProps): JSX.Element;

export interface MapStateToProps<P = any, R = any> {
  (state: State, ownProps: P): R;
}

export interface MapDispatchToProps<P = any, R = any> {
  (dispatch: Dispatch, ownProps: P): R;
}

export type Selector<P, R> = (state: State, props?: P, ...args: any[]) => R;

/**
 * Combines an object of many reducers to one new higher order reducer.
 */
export function combineReducers(reducers: CombinedReducers): Reducer;

/**
* Dispatches an **action** from anywhere in your codebase.
*/
export function dispatch(action: AnyAction): void;

export function select<P, R>(selector: Selector<P, R>, props?: P): R;

/**
 * Returns the global application store's **dispatch** function.
 */
export function useDispatch(): Dispatch;

/**
 * Takes a **selector** and returns its output value.
 */
export function useSelector<P, R>(selector: Selector<P, R>, props: P): R;

/**
 * Returns an instance of the store.
 */
export function useStore(): ReactStore;
