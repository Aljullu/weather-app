const todos = (state = {
  filter: '',
  status: 'ready',
  weatherData: []
}, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return { ...state, filter: action.filter };
    case 'REQUEST_DATA':
      return { ...state, status: 'loading' };
    case 'RECEIVE_DATA':
      return { ...state, status: 'ready', weatherData: action.data };
    default:
      return state;
  }
};

export default todos;
