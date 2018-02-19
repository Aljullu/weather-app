import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { App } from './App.jsx';

const {
  findRenderedComponentWithType
} = ReactTestUtils;

/** @test {App} */
describe('App', function() {
  /** @test {App#render} */
  it('should render without problems', function() {
    const store = createStore(() =>
      ({ weatherData: [] }), applyMiddleware(thunk));

    const provider = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <App dispatch={() => null} />
      </Provider>
    );

    const app = findRenderedComponentWithType(provider, App);

    assert(app);
  });
});
