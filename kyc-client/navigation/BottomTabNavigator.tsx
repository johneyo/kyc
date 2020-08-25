import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { BottomTabParamList, HomeParamList } from "../types";
import Home from "../screens/Home";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        style: { backgroundColor: "#fefefe", borderTopWidth: 0 },
        inactiveTintColor: "#eaeaf7",
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string; type?: string }) {
  return props.type === "MaterialIcons" ? (
    <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />
  ) : (
    <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: "#fefefe" } }}
    >
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}
