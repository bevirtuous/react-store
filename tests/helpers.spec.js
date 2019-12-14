import { dispatch, select } from '../src/helpers';
import { STORE_DISPATCH, emitter } from '../src/events';

jest.mock('../src/events', () => ({
  STORE_DISPATCH: 'STORE_DISPATCH',
  emitter: {
    emit: jest.fn(),
  },
}));

jest.mock('../src/Store', () => ({
  storeData: {
    store: {
      getState: () => ({
        foo: 'bar',
      }),
    },
  },
}));

describe('helpers', () => {
  describe('dispatch', () => {
    it('should not dispatch if no action is passed', (done) => {
      try {
        dispatch();
        done('Did not throw');
      } catch (error) {
        done();
      }
    });

    it('should emit an STORE_DISPATCH event', () => {
      dispatch({ type: 'INCREMENT' });
      expect(emitter.emit).toBeCalledWith(STORE_DISPATCH, { type: 'INCREMENT' });
    });
  });

  describe('select', () => {
    it('should not dispatch if no selector is passed', (done) => {
      try {
        select();
        done('Did not throw');
      } catch (error) {
        done();
      }
    });

    it('should return the desired value', () => {
      const result = select(state => state.foo);
      expect(result).toEqual('bar');
    });
  });
});
