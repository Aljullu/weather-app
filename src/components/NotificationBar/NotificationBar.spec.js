import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Wrapper from 'utils/Wrapper.jsx';
import NotificationBar from './NotificationBar.jsx';

const {
  scryRenderedDOMComponentsWithTag
} = ReactTestUtils;

/** @test {NotificationBar} */
describe('NotificationBar', function() {
  /** @test {NotificationBar#withMessage} */
  it('should be rendered when there is a message', function() {
    const wrapper = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <NotificationBar message="Lorem Ipsum" />
      </Wrapper>);

    const div = scryRenderedDOMComponentsWithTag(wrapper, 'div');

    assert.equal(div.length, 1);
  });

  /** @test {NotificationBar#noMessage} */
  it('should not be render when there is no message', function() {
    const wrapper = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <NotificationBar message="" />
      </Wrapper>);

    const div = scryRenderedDOMComponentsWithTag(wrapper, 'div');

    assert.equal(div.length, 0);
  });
});
