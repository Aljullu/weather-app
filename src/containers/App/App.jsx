import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from 'src/actions/index.js';
import Controls from 'src/containers/Controls/Controls.jsx';
import Notifications from 'src/containers/Notifications/Notifications.jsx';
import Cities from 'src/containers/Cities/Cities.jsx';

/**
 * App Root Component, contains the app
 */
class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchData);
  }

  render() {
    return (
      <div className="app">
        <Controls />
        <Notifications />
        <Cities />
      </div>
    );
  }
}

export default connect()(App);
