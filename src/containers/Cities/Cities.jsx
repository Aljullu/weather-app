import { connect } from 'react-redux';
import CitiesGrid from 'src/components/CitiesGrid/CitiesGrid.jsx';

/**
 * Checks if a rule resolves to true given a city.
 * That will happen in those cases:
 * * the ruleWord matches the city name or the weather text for that city or,
 * * the ruleWord is a temperature word and the temperature of the city matches
 * the range
 * @param {string} ruleWord - word to test
 * @param {object} cityData - data of the city to test
 * @return {bool} whether the rule was true for that city or not
 */
const isRuleTrue = (ruleWord, cityData) => {
  const lowerCaseRule = ruleWord.toLowerCase();

  switch (lowerCaseRule) {
    case 'hot':
      return cityData.Temperature.Metric.Value > 30;
    case 'warm':
      return cityData.Temperature.Metric.Value >= 20;
    case 'cool':
      return cityData.Temperature.Metric.Value < 20;
    case 'cold':
      return cityData.Temperature.Metric.Value < 10;
    case 'freezing':
      return cityData.Temperature.Metric.Value < 0;
  }

  return cityData.LocalizedName.toLowerCase().includes(lowerCaseRule) ||
    cityData.WeatherText.toLowerCase().includes(lowerCaseRule);
};

/**
 * Parses filter rules given a filter string and a regexp with the operator word
 * For example, the filter "cloudy and not warm" will return
 * the array ["cloudy", "not warm"]
 * @param {string} filter - string to parse
 * @param {object} regexpOperator - regular expression of the operator
 * @return {string[]} array of rules extracted from the filter
 */
const parseFilterRules = (filter, regexpOperator) => {
  const filterRules = filter.split(regexpOperator);
  const cleanedRules = filterRules.map(
    rule => rule.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ''));

  return cleanedRules.filter(rule => rule !== '');
};

/**
 * Applies reducers to the data. Used in a recursive way.
 * @param {object[]} data - weather data for all cities
 * @param {string} filter - filter string being tested or parsed
 * @param {reducers[]} reducers - array of reducers. The first one will be
 * applied in each iteration.
 * @return {object[]} weather data for all cities that comply with the rules
 * and with the reducers merge functions
 */
const applyReducers = (data, filter, reducers) => {
  // If there are no more reducers to handle,
  // filter the data with the filter string
  if (reducers.length === 0) {
    return data.filter(cityData => isRuleTrue(filter, cityData));
  }

  const reducer = reducers.shift();
  const regexpOperator = new RegExp(reducer.words.join('|'), 'i');

  // If the current filter text doesn't contain the operator,
  // proceed with the next one
  if (!filter.match(regexpOperator)) {
    return applyReducers(data, filter, reducers);
  }

  const filterRules = parseFilterRules(filter, regexpOperator);
  const filteredData = filterRules.map(
    rule => applyReducers(data, rule, reducers.slice()));

  return filteredData.reduce(reducer.func, reducer.initialState);
};

/**
 * AND operator reducer function
 * It will return the cities that are contained in both arrays at the same time
 * @param {object[]} accumulator - array of cities from previous iterations
 * @param {object[]} currentValue - array of cities being merged
 * @return {object[]} array of cities after the merge
 */
const andReducer = (accumulator, currentValue) => {
  return accumulator.filter(city => {
    for (let i = 0; i < currentValue.length; i++) {
      if (currentValue[i].Key === city.Key) {
        return true;
      }
    }

    return false;
  });
};

/**
 * OR operator reducer function
 * It will return the cities that are contained in at least one of the arrays
 * @param {object[]} accumulator - array of cities from previous iterations
 * @param {object[]} currentValue - array of cities being merged
 * @return {object[]} array of cities after the merge
 */
const orReducer = (accumulator, currentValue) => {
  currentValue.forEach(city => {
    for (let i = 0; i < accumulator.length; i++) {
      if (accumulator[i].Key === city.Key) {
        return;
      }
    }
    accumulator.push(city);
  });

  return accumulator;
};

/**
 * NOT operator reducer function
 * It will return the cities that are contained in the first array but not
 * in the second
 * @param {object[]} accumulator - array of cities from previous iterations
 * @param {object[]} currentValue - array of cities being merged
 * @return {object[]} array of cities after the merge
 */
const notReducer = (accumulator, currentValue) => {
  return accumulator.filter(city => {
    for (var i = 0; i < currentValue.length; i++) {
      if (currentValue[i].Key === city.Key) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Filter cities using a filter string
 * @param {object[]} data - weather data for all cities
 * @param {string} filter - filter string used to filter cities
 * @return {object[]} cities after being filtered
 */
const filterCities = (data, filter) => {
  if (!filter) {
    return data;
  }

  const reducers = [{
    words: ['and', 'but', 'as well as'],
    func: andReducer,
    initialState: data
  }, {
    words: ['or'],
    func: orReducer,
    initialState: []
  }, {
    words: ['not'],
    func: notReducer,
    initialState: data
  }];

  return applyReducers(data, filter, reducers);
};

const mapStateToProps = (state) => ({
  weatherData: filterCities(state.weatherData, state.filter)
});

/**
 * Component that handles which cities must be visible
 */
const Cities = connect(
  mapStateToProps
)(CitiesGrid);

export default Cities;
