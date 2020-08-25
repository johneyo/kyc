import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import { View, Text, Button } from "../components/Themed";
import Snack from "../components/SnackBar";
import { isEmptyObj, wait } from "../components/Functions";
import Constants from "expo-constants";

import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector, connect } from "react-redux";
import { login } from "../redux/actions/authentication";

interface SignInScreenProps {
  navigation: any;
  login: (vall: object) => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation, login }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({});

  const dispatch = useDispatch();
  const errors: any = useSelector(
    (state: {
      errors: {
        SignIn?: object;
      };
    }) => state.errors
  );
  useEffect(() => {
    errors && setErr(errors.SignIn);

    !isEmptyObj(errors) &&
      wait(2500).then(
        () => (
          console.log("hitting here"),
          dispatch({
            type: "RESET_ERRORS",
            payload: {},
          })
        )
      );
  }, [errors]);
  return (
    <View flex style={{ paddingHorizontal: 40 }}>
      <Snack
        color="#F84949"
        visible={err && !isEmptyObj(err)}
        text={err ? Object.values(err)[0] : ""}
        onDismiss={() => null}
        containerStyle={{ marginTop: Constants.statusBarHeight }}
      />
      <View flex={0.5} style={{ justifyContent: "flex-end" }}>
        <Text color="black" font="rubikBold">
          HACATHON
        </Text>
      </View>
      <View flex style={{ justifyContent: "flex-end" }}>
        <Text
          size="huge"
          font="rubikMedium"
          color="#2a2a2a"
          style={{ paddingBottom: 20 }}
        >
          Welcome Back!
        </Text>
        <Text size="small" color="#aca2a6">
          Please sign in
        </Text>
      </View>
      <View flex={2}>
        <View flex space="around">
          <TextInput
            placeholder="Email Address"
            style={{
              borderBottomColor: "#dbdae3",
              borderBottomWidth: 1,
              height: 70,
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={{
              borderBottomColor: "#dbdae3",
              borderBottomWidth: 1,
              height: 70,
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View flex space="around" ba>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: "#dbdae3",
              paddingTop: 8,
              width: "35%",
            }}
          >
            <Text style={{}}>Forgot Password?</Text>
          </View>
          <Button
            onPress={() => login({ email, password })}
            color="#086bff"
            style={{ alignSelf: "center" }}
            round
            shadowColor="lightgrey"
          >
            Sign In
          </Button>
        </View>
      </View>
      <View flex={0.7} style={{}}>
        <Text>
          New User?{" "}
          <Text
            onPress={() => navigation.navigate("SignUp")}
            font="rubikMedium"
            color="#363a89"
            style={{
              textDecorationStyle: "solid",
              textDecorationColor: "#dbdae3",
              textDecorationLine: "underline",
            }}
          >
            Create One
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  login,
})(SignInScreen);
