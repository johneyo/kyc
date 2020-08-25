import axios from "axios";
import { SET_CURRENT_USER, LOG_OUT } from "./types";
import { AsyncStorage } from "react-native";
import { setErrors, setSuccess, resetState } from "./generic";
import firebase from "./firebase";

const auth = firebase.auth();
const db = firebase.firestore();

export const login = (data, callback) => async (dispatch) => {
  console.log("logging in", data, URL);
  const { email, password } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("logged in");
      dispatch(setCurrentUser(data));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
        dispatch(
          setErrors({ auth: "No user, please create an account" }, "SignIn")
        );
      } else {
        dispatch(setErrors({ auth: errorMessage }, "SignIn"));
      }
    });
};

export const register = (data) => (dispatch) => {
  console.log("data", data);
  axios
    .post(
      `https://us-central1-kolowalletmoney.cloudfunctions.net/kyc/signup`,
      data
    )
    .then(
      (res) => (
        console.log("registering", res.data),
        dispatch(setSuccess(res.data, "SignUp"))
      )
    )
    .catch((err) => {
      console.log(err.response.data);
      if (err.message === "Network Error") {
        dispatch(setErrors({ message: "Not Connected" }));
      } else {
        err !== undefined &&
          (console.log("errorrrrr", err.response.data),
          dispatch(setErrors(err.response.data, "SignUp")));
      }
    });
};

export const setCurrentUser = (user) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const logout = () => async (dispatch) => {
  console.log("logging out");
  await AsyncStorage.removeItem("user", () => dispatch({ type: LOG_OUT }));
  resetState();
};
