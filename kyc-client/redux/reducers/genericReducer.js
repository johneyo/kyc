import {
  SET_SCANNED_VALUE,
  ENTER_AUTH,
  VERIFIED,
  ENTER_MOMO_AUTH,
  FETCHED,
  SUCCESS,
  IS_DNAR_NUM,
  FINGER_ENROLLED,
  GEO_LOCATION,
  RESET_SUCCESS,
} from "../actions/types";

const initialState = {
  scannedValue: "",
  enterAuth: false,
  verified: false,
  enterMomoAuth: false,
  Success: {
    Send: "",
    Deposit: false,
    QrScan: {},
    QrPay: false,
    Login: "",
    MomoAdd: "",
    NewCard: false,
    TransactionsDownload: [],
    SignUp: false,
    Bvn: {},
  },
  Fetched: false,
  isDnarNum: false,
  fingerEnrolled: null,
  geoLocation: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCANNED_VALUE:
      return {
        ...state,
        scannedValue: action.payload,
      };
    case ENTER_AUTH:
      return {
        ...state,
        enterAuth: action.payload,
      };
    case ENTER_MOMO_AUTH:
      return {
        ...state,
        enterMomoAuth: action.payload,
      };
    case VERIFIED:
      return {
        ...state,
        verified: action.payload,
      };
    case FETCHED:
      return {
        ...state,
        Fetched: action.payload,
      };
    case IS_DNAR_NUM:
      return {
        ...state,
        isDnarNum: action.payload,
      };
    case FINGER_ENROLLED:
      return {
        ...state,
        fingerEnrolled: action.payload,
      };
    case GEO_LOCATION:
      return {
        ...state,
        geoLocation: action.payload,
      };
    case SUCCESS:
      return {
        ...state,
        Success: {
          ...state.Success,
          [action.payload.action]: action.payload.value,
        },
      };
    case RESET_SUCCESS:
      return {
        ...state,
        Success: action.payload,
      };
    default:
      return state;
  }
}
