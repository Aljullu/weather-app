import React from 'react';
import PropTypes from 'prop-types';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import './city.css';

const getWeatherIcon = function(weatherIcon, weatherText, scrollPosition) {
  if (!weatherIcon) {
    return null;
  }

  const weatherIconNumber = ('0' + weatherIcon).slice(-2);
  const weatherIconUrl = 'https://developer.accuweather.com/sites/default/files/' + weatherIconNumber + '-s.png';

  return (
    <LazyLoadImage
      alt={weatherText}
      className="city-icon"
      height={45}
      scrollPosition={scrollPosition}
      src={weatherIconUrl}
      width={75} />);
};

/**
 * City component
 * renders the data about a city
 * @param {object} param - props
 * @param {object} param.values - weather values relative to the city
 * @return {object} City component
 */
const City = ({ values, scrollPosition }) => {
  const weatherIcon = getWeatherIcon(values.WeatherIcon,
    values.WeatherText, scrollPosition);

  return (
    <div className="city">
      {weatherIcon}
      <div className="city-name">{values.LocalizedName}</div>
      <div className="city-temperature">
        <span className="city-temperature-label">Temperature</span>
        <span className="city-temperature-value"
          title={values.Temperature.Imperial.Value + ' ' +
            values.Temperature.Imperial.Unit}>
          {values.Temperature.Metric.Value + ' ' +
          values.Temperature.Metric.Unit}
        </span>
      </div>
      <div className="city-weather-text">
        {values.WeatherText}
      </div>
    </div>
  );
};

City.propTypes = {
  values: PropTypes.shape({
    LocalizedName: PropTypes.string.isRequired,
    Temperature: PropTypes.shape({
      Imperial: PropTypes.shape({
        Unit: PropTypes.string.isRequired,
        Value: PropTypes.number.isRequired
      }).isRrequired,
      Metric: PropTypes.shape({
        Unit: PropTypes.string.isRequired,
        Value: PropTypes.number.isRequired
      }).isRrequired
    }).isRequired,
    WeatherText: PropTypes.string.isRequired,
    WeatherIcon: PropTypes.number
  }).isRequired
};

export default City;
