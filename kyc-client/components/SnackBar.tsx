import * as React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { View, Text } from "./Themed";
import Layout from "../constants/Layout";

interface SnackBarProps {
  visible: boolean;
  onDismiss: () => void;
  text: string;
  color: string;
  containerStyle: object;
}

const SnackBar: React.FC<SnackBarProps> = ({
  visible,
  onDismiss,
  text,
  color,
  containerStyle,
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Snackbar
        style={{ backgroundColor: color ? color : "#F84949" }}
        visible={visible}
        onDismiss={onDismiss}
        //   action={{
        //     label: 'Undo',
        //     onPress: onDismiss ,
        //   }}
      >
        <Text size="tiny" color="#fff" font="rubikMedium">
          {text || "Error."}
        </Text>
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignSelf: "stretch",
    justifyContent: "space-between",
    position: "relative",
    top: Layout["dim"](9.85, "h"),
    zIndex: 1,
  },
});
export default SnackBar;
