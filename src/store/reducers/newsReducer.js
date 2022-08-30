import * as actionTypes from "../actions/actionTypes";

const initialState = {
  news: [],
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_NEWS:
      return { ...state, isLoading: true, error: null };
    case actionTypes.GET_NEWS_SUCCESS:
      return { ...state, news: payload.news, isLoading: false };
    case actionTypes.GET_NEWS_FAIL:
      return { ...state, error: payload.error, isLoading: false };

    default:
      return state;
  }
};

export default reducer; 
