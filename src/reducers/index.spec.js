import assert from 'assert';

import index from './index';

/** @test {IndexReducer} */
describe('reducer', () => {
  /** @test {IndexReducer#initial} */
  it('should handle initial state', () => {
    const finalState = {
      filter: '',
      status: 'ready',
      weatherData: []
    };

    // eslint-disable-next-line no-undefined
    assert.deepEqual(index(undefined, {}), finalState);
  });

  /** @test {IndexReducer#changeFilter} */
  it('should handle CHANGE_FILTER', () => {
    const initialState = {
      filter: '',
      status: 'ready',
      weatherData: []
    };
    const filter = 'Lorem Ipsum';
    const finalState = {
      filter,
      status: 'ready',
      weatherData: []
    };

    assert.deepEqual(
      index(initialState, {
        type: 'CHANGE_FILTER',
        filter
      }), finalState);
  });

  /** @test {IndexReducer#requestData} */
  it('should handle REQUEST_DATA', () => {
    const initialState = {
      filter: '',
      status: 'ready',
      weatherData: []
    };
    const finalState = {
      filter: '',
      status: 'loading',
      weatherData: []
    };

    assert.deepEqual(
      index(initialState, {
        type: 'REQUEST_DATA'
      }), finalState);
  });

  /** @test {IndexReducer#receiveData} */
  it('should handle RECEIVE_DATA', () => {
    const initialState = {
      filter: '',
      status: 'ready',
      weatherData: []
    };
    const weatherData = { test: 'Lorem Ipsum' };
    const finalState = {
      filter: '',
      status: 'ready',
      weatherData
    };

    assert.deepEqual(
      index(initialState, {
        type: 'RECEIVE_DATA',
        data: weatherData
      }), finalState);
  });
});
