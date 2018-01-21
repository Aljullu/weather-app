import React from 'react';
import PropTypes from 'prop-types';

import './notification-bar.css';

/**
 * Notification Bar component
 * renders a notification bar to display messages to the user only when a
 * message is provided
 * @param {object} param - props
 * @param {string} param.message - message to display
 * @return {object|null} Notification bar component or null if there is no
 * message
 */
const NotificationBar = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="notification-bar">
      {message}
    </div>
  );
};

NotificationBar.propTypes = {
  message: PropTypes.string
};

export default NotificationBar;
