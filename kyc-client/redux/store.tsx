/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import appReducer from "./reducers";
import AsyncStorage from "@react-native-community/async-storage";
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    console.log("logged oout");
    AsyncStorage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
