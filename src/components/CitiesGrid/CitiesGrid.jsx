import React from 'react';
import PropTypes from 'prop-types';
import { trackWindowScroll } from 'react-lazy-load-image-component';

import City from 'src/components/City/City.jsx';

import './cities-grid.css';

/**
 * Cities Grid component
 * renders a City component for each city contained in the data
 * @param {object} param - props
 * @param {object} param.weatherData - object containing the weather data
 * @return {object} CitiesGrid component
 */
const CitiesGrid = ({ scrollPosition, weatherData }) => (
  <div className="cities-grid">
    {weatherData.map((city) =>
      <City key={city.Key} scrollPosition={scrollPosition} values={city} />
    )}
  </div>
);

CitiesGrid.propTypes = {
  weatherData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default trackWindowScroll(CitiesGrid);
