import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Controls from './Controls.jsx';
import mockData from 'utils/mockData.json';

const {
  scryRenderedDOMComponentsWithClass
} = ReactTestUtils;

/** @test {Controls} */
describe('Controls', function() {
  const weatherSuggestions = ['a shower', 'clear', 'clouds and sun',
    'cloudy', 'cold', 'cool', 'foggy', 'freezing', 'hot', 'light fog'];

  const assertControlsRenderByFilter = (filter, expectedSuggestions) => {
    const store = createStore(() => ({ filter, weatherData: mockData }));
    const provider = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Controls />
      </Provider>
    );
    const suggestions =
      scryRenderedDOMComponentsWithClass(provider, 'filter-suggestion');

    for (let i = 0; i < suggestions.length; i++) {
      assert.equal(suggestions[i].innerHTML, expectedSuggestions[i]);
    }
  };

  /** @test {Controls#all} */
  it('should render default suggestion', function() {
    assertControlsRenderByFilter('', ['cloudy', 'warm', 'hot and sunny',
      'hot or cold', 'not warm', 'Barcelona',
      'Warm as well as sunny but not hot.']);
  });

  /** @test {Controls#cities} */
  it('should render city suggestions', function() {
    assertControlsRenderByFilter('Ba',
      ['Baghdad', 'Banda Aceh', 'Bangkok', 'Barcelona']);
  });

  /** @test {Controls#weatherText} */
  it('should render weatherText suggestions', function() {
    assertControlsRenderByFilter('Su', ['sunny']);
  });

  /** @test {Controls#temperatureText} */
  it('should render temperature suggestions', function() {
    assertControlsRenderByFilter('Free', ['freezing']);
  });

  /** @test {Controls#operators} */
  it('should render suggestions based on operators', function() {
    assertControlsRenderByFilter('Not ', weatherSuggestions);
    assertControlsRenderByFilter('Cold and ', weatherSuggestions);
    assertControlsRenderByFilter('Cold or ', weatherSuggestions);
  });

  /** @test {Controls#multiWordOperators} */
  it('should render suggestions based on several words operators', function() {
    assertControlsRenderByFilter('Cold as well as ', weatherSuggestions);
  });
});
