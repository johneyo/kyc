import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { View, Text, Button } from "../components/Themed";
import Modal from "react-native-modal";
import firebase from "../redux/actions/firebase.js";
import * as Animatable from "react-native-animatable";
import Touchable from "react-native-platform-touchable";
import Layout from "../constants/Layout";
import { wait } from "../components/Functions";

interface EmailModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const viewRef = useRef(null);
  const verify = () => {
    var user = firebase.auth().currentUser;
    console.log("verifying");
    viewRef && viewRef.current.stopAnimation();
    setVerifying(true);
    user
      .sendEmailVerification()
      .then(function () {
        console.log("sent");
        wait(200).then(
          () => (
            setVerifying(false),
            setOpen(false),
            Alert.alert("Verification Sent")
          )
        );
      })
      .catch(function (error) {
        console.log("error", error);
        setVerifying(false);
      });
  };
  return (
    <Modal
      isVisible={open}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        backgroundColor: "rgba(0,0,0,.1)",
        alignItems: "center",
      }}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      onBackdropPress={() => setOpen(false)}
      animationInTiming={800}
      animationOutTiming={800}
    >
      <View
        width={100}
        height={30}
        backgroundColor="#f5f5f5"
        style={{ borderRadius: 30, padding: 20 }}
        center
        space="around"
      >
        <View>
          <Text center font="rubikBold" color="#2a2a2a">
            Email Verification
          </Text>
        </View>
        <Touchable
          onPress={() => verify()}
          style={{
            transform: [{ rotate: "45deg" }],
            borderRadius: Layout["dim"](21.25, "w"),
          }}
        >
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            ref={viewRef}
            style={{
              backgroundColor: "#000",
              width: Layout["dim"](32.5, "w"),
              height: Layout["dim"](32.5, "w"),
              borderRadius: Layout["dim"](17, "w"),
              borderTopColor: "#fff",
              borderWidth: 5,
              borderColor: "#000",
              shadowColor: "grey",
              shadowOffset: { width: 1, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View middle flex style={{ transform: [{ rotate: "-45deg" }] }}>
              <Text font="rubikMedium" color="#fff">
                {verifying ? "Verifying" : "Verify"}
              </Text>
            </View>
          </Animatable.View>
        </Touchable>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default EmailModal;
