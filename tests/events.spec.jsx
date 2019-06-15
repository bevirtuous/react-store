import EventEmitter from 'events';
import { emitter, STORE_DISPATCH } from '../src/events';

describe('events', () => {
  it('emitter is a correct instance of the EventEmitter class', () => {
    expect(emitter instanceof EventEmitter).toBeTruthy();
  });

  it('STORE_DISPATCH is of type string and has the correct value', () => {
    expect(typeof STORE_DISPATCH).toEqual('string');
    expect(STORE_DISPATCH).toEqual('STORE_DISPATCH');
  });
});
