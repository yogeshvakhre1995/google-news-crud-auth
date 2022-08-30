import * as actionTypes from "./actionTypes";

const apiUrl = "https://api.github.com/users/KrunalLathiya";

export const getNews = () => {
  return {
    type: actionTypes.GET_NEWS,
  };
};

export const getNewsSucess = (news) => {
  return {
    type: actionTypes.getNewsSucess,
    payload: {
      news: news,
    },
  };
};

export const getNewsFail = (error) => {
  return {
    type: actionTypes.GET_NEWS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const inItNews = () => {
  return (dispatch) => {
    dispatch(getNews());
    axios
      .get(apiUrl)
      .then((response) => dispatch(getNewsSucess(response.data)))
      .catch((error) => dispatch(getNewsFail(error)));
  };
};
