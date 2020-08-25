import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import { View, Text, Button } from "../components/Themed";
import { register } from "../redux/actions/authentication";
import { connect, useSelector, useDispatch } from "react-redux";
import Snack from "../components/SnackBar";
import { isEmptyObj, wait } from "../components/Functions";
import Constants from "expo-constants";

interface SignUpScreenProps {
  navigation: any;
  register: (val: object) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  navigation,
  register,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [err, setErr] = useState<{ message: string }>();
  const [Success, setSuccess] = useState(false);
  const errors: any = useSelector(
    (state: {
      errors: {
        SignUp?: { message: string };
      };
    }) => state.errors
  );
  const success: any = useSelector(
    (state: {
      generic: {
        Success: {
          SignUp?: boolean;
        };
      };
    }) => state.generic.Success.SignUp
  );
  const dispatch = useDispatch();
  useEffect(() => {
    errors && setErr(errors.SignUp);

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

  useEffect(() => {
    console.log("success", success);
    success && (console.log("success login", success), setSuccess(true));
    success &&
      wait(1500).then(
        () => (
          console.log("hitting here"),
          navigation.navigate("SignIn"),
          dispatch({
            type: "RESET_SUCCESS",
            payload: {},
          })
        )
      );
  }, [success]);

  return (
    <View flex style={{ paddingHorizontal: 40 }}>
      <Snack
        color="#F84949"
        visible={(err && !isEmptyObj(err)) || Success}
        text={err?.message ? err.message : Success ? "Sign In" : ""}
        onDismiss={() => null}
        containerStyle={{
          marginTop: Constants.statusBarHeight,
          color: success ? "green" : "",
        }}
      />
      <View flex={0.5} style={{ justifyContent: "flex-end" }}>
        <Text color="black" font="rubikBold">
          HACATHON
        </Text>
      </View>
      <View flex={0.8} style={{ justifyContent: "flex-end" }}>
        <Text
          size="huge"
          font="rubikMedium"
          color="#2a2a2a"
          style={{ paddingBottom: 20 }}
        >
          Hello!
        </Text>
        <Text size="small" color="#aca2a6">
          Enter your Email and password to continue
        </Text>
      </View>
      <View flex={2.1}>
        <View flex space="around">
          <TextInput
            placeholder="Full Name"
            style={{
              borderBottomColor: "#dbdae3",
              borderBottomWidth: 1,
              height: 50,
            }}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          <TextInput
            placeholder="Email Address"
            style={{
              borderBottomColor: "#dbdae3",
              borderBottomWidth: 1,
              height: 50,
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
              height: 50,
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            style={{
              borderBottomColor: "#dbdae3",
              borderBottomWidth: 1,
              height: 50,
            }}
            onChangeText={(text) => setconfirmPassword(text)}
            value={confirmPassword}
          />
        </View>

        <View flex={0.7} space="around" ba>
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
            onPress={() =>
              register({
                fullName,
                password,
                confirmPassword,
                email,
              })
            }
            color="#086bff"
            style={{ alignSelf: "center" }}
            round
            shadowColor="lightgrey"
          >
            Sign Up
          </Button>
        </View>
      </View>
      <View flex={0.5} style={{}}>
        <Text>
          Existing User?
          <Text
            onPress={() => navigation.navigate("SignIn")}
            font="rubikMedium"
            color="#363a89"
            style={{
              textDecorationStyle: "solid",
              textDecorationColor: "#dbdae3",
              textDecorationLine: "underline",
            }}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  generic: state.generic,
});

export default connect(mapStateToProps, {
  register,
})(SignUpScreen);
