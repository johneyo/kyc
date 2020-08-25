import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { useSelector } from "react-redux";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator, { HomeNavigator } from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { isEmptyObj } from "../components/Functions";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const user: any = useSelector((state) => state.auth.User);
  console.log("user", user);
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fefefe" },
      }}
    >
      {user && !isEmptyObj(user) ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const App = createStackNavigator<AppParamList>();
function AppNavigator() {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Root" component={BottomTabNavigator} />
    </App.Navigator>
  );
}
const Auth = createStackNavigator<AuthParamList>();
function AuthNavigator() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="SignIn" component={SignInScreen} />
      <Auth.Screen name="SignUp" component={SignUpScreen} />
    </Auth.Navigator>
  );
}
