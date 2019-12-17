/* eslint-disable no-undef */
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

export interface Store {
  (props: StoreProps): JSX.Element;
}

export interface MapStateToProps<P = any, R = any> {
  (state: State, ownProps: P): R;
}

export interface MapDispatchToProps<P = any, R = any> {
  (dispatch: Dispatch, ownProps: P): R;
}

export type Selector<P, R> = (state: State, props?: P, ...args: any[]) => R;

export interface combineReducers {
  (reducers: CombinedReducers): Reducer;
}

/**
* Dispatches an **action** from anywhere in your codebase.
*/
export interface dispatch {
  (action: AnyAction): void;
}

export interface select<P, R> {
  (selector: Selector<P, R>, props?: P): R;
}

export interface useDispatch {
  (): Dispatch;
}

export interface useSelector<P, R> {
  (selector: Selector<P, R>, props: P): R;
}

export interface useStore {
  (): ReactStore;
}
