import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Touchable from "react-native-platform-touchable";
import Layout from "../constants/Layout";
import { View, Text } from "../components/Themed";
const { width, height } = Dimensions.get("screen");

interface PassportModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  callBack: (val: string) => void;
  uploading: boolean;
}

const PassportModal: React.FC<PassportModalProps> = ({
  open,
  setOpen,
  callBack,
  uploading,
}) => {
  return (
    <Modal
      propagateSwipe
      isVisible={open}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        backgroundColor: "rgba(0,0,0,.2)",
      }}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      onBackdropPress={() => setOpen(false)}
      animationInTiming={800}
      animationOutTiming={800}
    >
      {!uploading ? (
        <View
          style={{
            backgroundColor: "white",
            width,
            height: Layout["dim"](20, "h"),
            borderTopRightRadius: Layout["dim"](5.33, "w"),
            borderTopLeftRadius: Layout["dim"](5.33, "w"),
          }}
          center
        >
          <View
            flex={0.1}
            style={{
              borderTopWidth: 2,
              borderTopColor: "lightgray",
              width: Layout["dim"](10, "w"),
              marginTop: Layout["dim"](2, "h"),
            }}
          />
          <View
            flex={0.7}
            style={{
              paddingHorizontal: Layout["dim"](10, "w"),
              alignSelf: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text
              size={24}
              color="#ddd"
              style={{
                fontFamily: "rubikBold",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Upload From?
            </Text>
          </View>
          <View flex row middle style={{ width }}>
            <Touchable style={{ flex: 1 }} onPress={() => callBack("Camera")}>
              <View
                flex
                row
                space="around"
                center
                style={{ alignSelf: "stretch" }}
              >
                <Ionicons name="ios-camera" size={24} color={"primary"} />
                <Text
                  size={"small"}
                  color={"secondary"}
                  style={{ fontFamily: "rubikBold" }}
                >
                  Camera
                </Text>
              </View>
            </Touchable>
            <Touchable
              style={{ flex: 1 }}
              opacity={0.1}
              onPress={() => callBack("Media")}
            >
              <View
                flex
                row
                center
                space="around"
                backgroundColor="secondary"
                style={{
                  alignSelf: "stretch",
                  borderTopLeftRadius: 20,
                }}
              >
                <Text
                  size={"small"}
                  color="#fff"
                  style={{ fontFamily: "rubikBold" }}
                >
                  Gallery
                </Text>
                <Ionicons name="md-image" size={24} color="#fff" />
              </View>
            </Touchable>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            width,
            height: Layout["dim"](20, "h"),
            borderTopRightRadius: Layout["dim"](5.33, "w"),
            borderTopLeftRadius: Layout["dim"](5.33, "w"),
          }}
          middle
        >
          <Text size={"small"} style={{ fontFamily: "rubikBold" }}>
            Uploading...
          </Text>
        </View>
      )}
    </Modal>
  );
};
export default PassportModal;
