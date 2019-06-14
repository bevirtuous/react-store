import { emitter, STORE_DISPATCH } from './events';
import { storeData } from './Store';

/**
 * Dispatches action **action** from anywhere in your codebase.
 * @param {Object} action A plain object representing "what changed". An action must have
 * a `type` property which may not be `undefined`. It is a good idea to use
 * string constants for action types.
 */
export const dispatch = (action) => {
  emitter.emit(STORE_DISPATCH, action);
};

export const select = (selector, props) => (
  selector(storeData.store.getState(), props)
);
