import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeFilter } from 'src/actions';
import Filter from 'src/components/Filter/Filter.jsx';

const operators = ['and', 'but', 'as well as', 'or', 'not'];

/**
 * Given an array of strings with duplicates,
 * return the same array without duplicates
 * @param {string[]} suggestions - array with duplicates
 * @return {string[]} array without duplicates
 */
const removeDuplicates = (suggestions) => {
  return suggestions.filter((suggestion, index) => {
    return suggestions.indexOf(suggestion) === index;
  });
};

/**
 * Given an array with null values, return
 * the same array without the null values
 * @param {string[]} suggestions - array with null values
 * @return {string[]} array without null values
 */
const removeNulls = (suggestions) => {
  return suggestions.filter(suggestion => suggestion !== null);
};

/**
 * Given a disordered array of strings, order it alphabetically
 * Note: for PhantomJS to work properly, a numeric value must be returned
 * in the sort function
 * @param {string[]} suggestions - array of strings disordered
 * @return {string[]} array of strings ordered alphabetically
 */
const sortAlphabetically = (suggestions) => {
  return suggestions.sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    } else if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }

    return 0;
  });
};

/**
 * Returns the list of city names that start with a string (but don't match it)
 * @param {object[]} data - array of cities data
 * @param {string} partialWord - string to test against
 * @return {string[]} array with the city names that start with that string
 * or nulls
 */
const generateCitySuggestions = (data, partialWord) => {
  return data.map(city => {
    if (city.LocalizedName.toLowerCase().startsWith(partialWord) &&
        city.LocalizedName.toLowerCase() !== partialWord) {
      return city.LocalizedName;
    }

    return null;
  });
};

/**
 * Returns the list of weather text strings that start with a string (but don't
 * match it). If no partialWord is provided, all weather text strings will be
 * returned.
 * @param {object[]} data - array of cities data
 * @param {string} partialWord - string to test against
 * @return {string[]} array with the weather text that start with that string
 * or nulls
 */
const generateWeatherSuggestions = (data, partialWord) => {
  return data.map(city => {
    const weatherText = city.WeatherText.toLowerCase();

    if (!partialWord ||
         (weatherText.startsWith(partialWord) &&
           weatherText !== partialWord)) {
      return weatherText;
    }

    return null;
  });
};

/**
 * Returns the list of temperature words that start with a string (but don't
 * match it). If not partialWord is provided, all temperature words strings
 * will be returned.
 * @param {object[]} data - array of cities data
 * @param {string} partialWord - string to test against
 * @return {string[]} array with the temperature words that start with that
 * string or nulls
 */
const generateTemperatureSuggestions = (data, partialWord) => {
  return ['hot', 'warm', 'cool', 'cold', 'freezing'].map(word => {
    if (!partialWord ||
         (word.startsWith(partialWord) && word !== partialWord)) {
      return word;
    }

    return null;
  });
};

/**
 * Returns a list of suggestions based on a string the user is writing.
 * @param {object[]} data - array of cities data
 * @param {string} partialWord - string being written
 * @return {string[]} list of relevant suggestions
 */
const generateSuggestionsBasedOnPartialWord = (data, partialWord) => {
  const weatherSuggestions =
    generateWeatherSuggestions(data, partialWord);
  const temperatureSuggestions =
    generateTemperatureSuggestions(data, partialWord);

  return weatherSuggestions.concat(temperatureSuggestions);
};

/**
 * Returns a list of suggestions based on the last string the user wrote.
 * If the last word was not an operator, an operator will be suggested,
 * otherwise, a weather or temperature text will be.
 * @param {object[]} data - array of cities data
 * @param {string} lastWord - last string written
 * @return {string[]} list of relevant suggestions
 */
const generateSuggestionsBasedOnLastWord = (data, lastWord) => {
  if (!operators.includes(lastWord)) {
    return operators;
  }

  const weatherSuggestions = generateWeatherSuggestions(data);
  const temperatureSuggestions = generateTemperatureSuggestions(data);

  return weatherSuggestions.concat(temperatureSuggestions);
};

/**
 * Returns the last word from a string. Considering multi-word operators
 * behave like only one world.
 * @param {string} filter - filter string to extract the last word from
 * @return {string} last word of that string
 */
const getLastWord = (filter) => {
  if (filter.indexOf(' ') < 1) {
    return null;
  }

  const trimmedFilter = filter.trim();

  for (let i = 0; i < operators.length; i++) {
    if (trimmedFilter.endsWith(operators[i])) {
      return operators[i];
    }
  }

  return trimmedFilter.split(' ').pop();
};

/**
 * Returns a list of suggestions based on the current filter.
 * @param {string} filter - string being written
 * @param {object[]} data - array of cities data
 * @return {string[]} list of relevant suggestions
 */
const generateSuggestions = (filter, data) => {
  const lowerCaseFilter = filter.toLowerCase();

  if (lowerCaseFilter.endsWith(' ')) {
    return generateSuggestionsBasedOnLastWord(data,
      getLastWord(lowerCaseFilter));
  }

  const splittedFilter = lowerCaseFilter.split(' ');
  const partialWord = splittedFilter.length > 0 ?
    splittedFilter.pop() : lowerCaseFilter;

  const suggestions = generateSuggestionsBasedOnPartialWord(data, partialWord);

  if (splittedFilter.length > 0) {
    return suggestions;
  }

  return suggestions.concat(generateCitySuggestions(data, partialWord));
};

/**
 * Returns a list of suggestions based on the current filter. Or, if it's
 * missing, returns a list of default suggestions.
 * @param {string} filter - string being written
 * @param {object[]} data - array of cities data
 * @return {string[]} list of relevant suggestions or default suggestions.
 */
const getSuggestions = (filter = '', data) => {
  if (filter === '') {
    return ['cloudy', 'warm', 'hot and sunny', 'hot or cold',
      'not warm', 'Barcelona', 'Warm as well as sunny but not hot.'];
  }

  const rawSuggestions = generateSuggestions(filter, data);
  const suggestions = removeDuplicates(removeNulls(rawSuggestions));

  return sortAlphabetically(suggestions).slice(0, 10);
};

/**
 * Component that handles the state of the Filter component and what suggestions
 * must it display
 */
class Controls extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    filter: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  /**
   * Function to handle changes in the filter input value
   * @param {string} text - new filter
   */
  handleChangeFilter = (text) => {
    this.props.dispatch(changeFilter(text));
  }

  render() {
    return (
      <Filter
        filter={this.props.filter}
        loading={this.props.loading}
        onChangeFilter={this.handleChangeFilter}
        suggestions={this.props.suggestions} />
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  loading: state.status === 'loading',
  suggestions: getSuggestions(state.filter, state.weatherData)
});

export default connect(mapStateToProps)(Controls);
