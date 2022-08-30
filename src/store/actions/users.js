import * as actionType from "./actionTypes";

const apiUrl = "https://api.github.com/users/KrunalLathiya";

export const getUsers = () => {
  return {
    type: actionType.GET_USERS,
  };
};

export const getUsersSucess = (users) => {
  return {
    type: actionType.ADD_USER_SUCCESS,
    payload: {
      users: users,
    },
  };
};

export const getUsersFail = (error) => {
  return {
    type: actionType.EDIT_USER_FAIL,
    payload: {
      error: error,
    },
  };
};

export const inItUsers = () => {
  return (dispatch) => {
    dispatch(getUsers());
    axios
      .get(apiUrl)
      .then((response) => dispatch(getUsersSucess(response.data)))
      .catch((error) => dispatch(getUsersFail(error)));
  };
};
