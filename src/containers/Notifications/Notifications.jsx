import { connect } from 'react-redux';

import NotificationBar
  from 'src/components/NotificationBar/NotificationBar.jsx';

/**
 * Given a state, generate the proper message to display to the user.
 * * If it's loading, display a login text
 * * If it's not loading but there is a filter set, display that filter
 * * Otherwise display nothing
 * @param {string} state - state
 * @param {string} state.status - current app status
 * @param {string} state.filter - current app filter
 * @return {string} message to display to the user
 */
const generateMessage = state => {
  if (state.status === 'loading') {
    return 'Loading...';
  }

  if (state.filter) {
    return 'Filtered by: ' + state.filter;
  }

  return '';
};

const mapStateToProps = (state) => ({
  message: generateMessage(state)
});

const Notifications = connect(
  mapStateToProps
)(NotificationBar);

export default Notifications;
