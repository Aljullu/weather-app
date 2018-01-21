import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Wrapper from 'utils/Wrapper.jsx';
import City from './City.jsx';

const {
  scryRenderedDOMComponentsWithTag
} = ReactTestUtils;

/** @test {City} */
describe('City', function() {
  /** @test {City#icon} */
  it('should render the icon when available', function() {
    const wrapper = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <City values={{
          WeatherIcon: 1,
          WeatherText: 'Sunny',
          LocalizedName: 'Barcelona',
          Temperature: {
            Metric: {
              Unit: 'C',
              Value: 20
            },
            Imperial: {
              Unit: 'F',
              Value: 68
            }
          }
        }} />
      </Wrapper>);

    const img = scryRenderedDOMComponentsWithTag(wrapper, 'img');

    assert.equal(img.length, 1);
  });

  /** @test {City#noIcon} */
  it('should not render the icon when not available', function() {
    const wrapper = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <City values={{
          WeatherText: 'Sunny',
          LocalizedName: 'Barcelona',
          Temperature: {
            Metric: {
              Unit: 'C',
              Value: 20
            },
            Imperial: {
              Unit: 'F',
              Value: 68
            }
          }
        }} />
      </Wrapper>);

    const img = scryRenderedDOMComponentsWithTag(wrapper, 'img');

    assert.equal(img.length, 0);
  });
});
