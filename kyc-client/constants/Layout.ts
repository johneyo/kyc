import { Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const dim = (val: number, orientation: string) => {
  return orientation === "w" ? wp(`${val}%`) : hp(`${val}%`);
};

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  dim,
};
