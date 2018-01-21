import assert from 'assert';

import * as actions from './index';

/** @test {Actions} */
describe('actions', () => {
  /** @test {Actions#changeFilter} */
  it('changeFilter should create CHANGE_FILTER action', () => {
    const filter = 'Lorem Ipsum';

    assert.deepEqual(actions.changeFilter(filter), {
      type: 'CHANGE_FILTER',
      filter: filter
    });
  });

  /** @test {Actions#requestData} */
  it('requestData should create REQUEST_DATA action', () => {
    assert.deepEqual(actions.requestData(), {
      type: 'REQUEST_DATA'
    });
  });

  /** @test {Actions#receiveData} */
  it('receiveData should create RECEIVE_DATA action', () => {
    const testObject = {
      test: 'Lorem Ipsum'
    };

    assert.deepEqual(actions.receiveData(testObject), {
      type: 'RECEIVE_DATA',
      data: testObject
    });
  });
});
