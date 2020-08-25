import {
  SET_CURRENT_USER,
  SET_IDLE_USER,
  UPDATE_USERNAME
} from "../actions/types";

const initialState = {
  User: {},
  idleUser: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        User: action.payload
      };

    case SET_IDLE_USER:
      return {
        ...state,
        idleUser: action.payload
      };

    case UPDATE_USERNAME:
      return {
        ...state,
        User: {
          ...state.User,
          username: action.payload,
          isUsernameUpdatable: false
        }
      };
    default:
      return state;
  }
}
