import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Cities from './Cities.jsx';
import mockData from 'utils/mockData.json';

const {
  scryRenderedDOMComponentsWithClass
} = ReactTestUtils;

/** @test {Cities} */
describe('Cities', function() {
  const assertCitiesRenderByFilter = (filter, resultCount) => {
    const store = createStore(() => ({ filter, weatherData: mockData }));
    const provider = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Cities />
      </Provider>
    );
    const cities = scryRenderedDOMComponentsWithClass(provider, 'city');

    assert.equal(cities.length, resultCount);
  };

  /** @test {Cities#all} */
  it('should render all cities', function() {
    assertCitiesRenderByFilter('', 150);
  });

  /** @test {Cities#byName} */
  it('should render cities filtered by name', function() {
    assertCitiesRenderByFilter('barcelona', 1);
  });

  /** @test {Cities#byWeatherText} */
  it('should render cities filtered by weather text', function() {
    assertCitiesRenderByFilter('cloudy', 55);
  });

  /** @test {Cities#byTemperature} */
  it('should render cities filtered by temperature', function() {
    assertCitiesRenderByFilter('warm', 60);
  });

  /** @test {Cities#andOperator} */
  it('should handle AND operator', function() {
    assertCitiesRenderByFilter('hot and sunny', 5);
  });

  /** @test {Cities#orOperator} */
  it('should handle OR operator', function() {
    assertCitiesRenderByFilter('hot or cold', 62);
  });

  /** @test {Cities#notOperator} */
  it('should handle NOT operator', function() {
    assertCitiesRenderByFilter('not warm', 90);
  });

  /** @test {Cities#compoundOperator} */
  it('should handle compound operators', function() {
    assertCitiesRenderByFilter('Warm as well as sunny but not hot.', 25);
  });
});
