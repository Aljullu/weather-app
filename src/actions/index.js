import { accuWeatherKey } from '../keys';
import fetch from 'cross-fetch';

/**
 * Change filter action
 * @param {string} text - new filter text
 * @return {object} action object
 * @property {string} type - action type
 * @property {string} filter - new filter text
 */
export const changeFilter = (text) => ({
  type: 'CHANGE_FILTER',
  filter: text
});

/**
 * Request data action
 * @return {object} action object
 * @property {string} type - action type
 */
export const requestData = () => ({
  type: 'REQUEST_DATA'
});

/**
 * Receive data action
 * @param {string} json - JSON object with the data
 * @return {object} action object
 * @property {string} type - action type
 * @property {object} data - JSON object with the data
 */
export const receiveData = (json) => ({
  type: 'RECEIVE_DATA',
  data: json
});

/**
 * Fetch data
 * @param {function} dispatch - dispatch
 * @return {Promise} fetch promise
 */
export const fetchData = (dispatch) => {
  const url = 'http://dataservice.accuweather.com/currentconditions/v1/topcities/150?apikey=' + accuWeatherKey + '&language=en-US&details=true';

  dispatch(requestData());

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)));
};
