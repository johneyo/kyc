import { SUCCESS, GET_ERRORS, RESET_SUCCESS, RESET_ERRORS } from "./types";

export const setSuccess = (value, action) => (dispatch) => {
  console.log("hitting success", value, action);
  dispatch({
    type: SUCCESS,
    payload: {
      action,
      value,
    },
  });
};

export const setErrors = (value, action) => (dispatch) => {
  console.log("errors", value, action);

  dispatch({
    type: GET_ERRORS,
    payload: { action, value },
  });
};

export const resetState = () => (dispatch) => {
  console.log("resetting");
  dispatch({
    type: RESET_ERRORS,
    payload: {
      SignIn: {},
      SignUp: {},
    },
  });
  dispatch({
    type: RESET_SUCCESS,
    payload: {
      SignIn: "",
      SignUp: "",
    },
  });
};
