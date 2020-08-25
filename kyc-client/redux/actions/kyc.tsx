import axios from "axios";
import { SET_CURRENT_USER, LOG_OUT } from "./types";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import {
  setErrors,
  enterAuth,
  verifiedAuth,
  setSuccess,
  resetState,
} from "./generic";
import firebase from "./firebase";

const auth = firebase.auth();
const db = firebase.firestore();
export const verifyBvn = (data, callback) => (dispatch) => {
  console.log("data", data);
  axios
    .post(
      `https://us-central1-kolowalletmoney.cloudfunctions.net/kyc/bvn`,
      data
    )
    .then(
      (res) => (
        console.log("resolving", res.data.data),
        dispatch(setSuccess(res.data.data, "Bvn"))
      )
    )
    .catch(
      (err) => (
        console.log("error", err.response.data), callback({ status: false })
      )
    );
};
