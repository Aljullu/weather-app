import React from 'react';

/**
 * Wrapper component
 * used to test functional components
 */
class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export default Wrapper;
