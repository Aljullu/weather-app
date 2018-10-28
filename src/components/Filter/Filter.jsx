import React from 'react';
import PropTypes from 'prop-types';

import './filter.css';

/**
 * Filter component
 * renders and input box with a reset button and a list of suggestions
 * @param {object} param - props
 * @param {string} param.filter - current filter
 * @param {bool} param.loading - whether controls must be disabled
 * @param {string[]} param.suggestions - suggestions to display under the input
 * @param {function} param.onChangeFilter - function to handle filter change
 * @return {object} Filter component
 */
const Filter = ({ filter, loading, suggestions, onChangeFilter }) => (
  <div className="filter">
    <form className="filter-form">
      <input
        className="filter-input"
        disabled={loading}
        type="search"
        onChange={e => onChangeFilter(e.target.value)}
        value={filter} />
      <input
        className="filter-reset"
        disabled={loading}
        title="Clear"
        type="reset"
        value="Clear"
        onClick={() => onChangeFilter('')} />
    </form>
    <div className="filter-suggestions">
      {suggestions.map((suggestion) =>
        <button key={suggestion}
          className="filter-suggestion"
          onClick={() => {
            const filterArray = filter.split(' ').slice(0, -1);
            const finalFilter = filterArray.join(' ') + ' ' + suggestion;

            return onChangeFilter(finalFilter.trim());
          }}>
          {suggestion}
        </button>
      )}
    </div>
  </div>
);

Filter.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string)
};

Filter.defaultProps = {
  suggestions: []
};

export default Filter;
