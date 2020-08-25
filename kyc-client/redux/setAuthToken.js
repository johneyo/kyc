import axios from "axios";
import { AsyncStorage } from "react-native";

const setAuthToken = async () => {
  const token = await AsyncStorage.getItem("user");
  const AuthStr = "Bearer " + token;
  console.log("authtoken");
  if (AuthStr) {
    axios.defaults.headers.common["Authorization"] = AuthStr;
    // axios.defaults.headers.common["Content-Type"] =
    //   "application/json; charset=utf-8";
    // axios.defaults.headers.common["Accept"] = "application/json";
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
