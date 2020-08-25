import * as React from "react";
import {
  Text as DefaultText,
  Block as DefaultView,
  Button as DefaultButton,
} from "galio-framework";
import Colors from "../constants/Colors";
import Layouts from "../constants/Layout";
import Sizes from "../constants/Sizes";
import useColorScheme from "../hooks/useColorScheme";
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // const localTheme = await AsyncStorage.getItem("theme");
  const theme = useColorScheme();
  const colorFromProps = props[theme];
  // console.log("theme", theme, colorFromProps);
  if (colorFromProps) {
    return colorFromProps;
  } else if (Colors[theme][colorName]) {
    return Colors[theme][colorName];
  } else {
    return colorName;
  }
}

export function getFontSize(
  size: "icon" | "big" | "tiny" | "huge" | "massive" | "medium" | "small"
) {
  return Sizes["fonts"][size];
}
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  backgroundColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & DefaultButton["props"];
export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    size,
    color,
    font,
    ...otherProps
  } = props;
  const mainColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  return (
    <DefaultText
      color={mainColor}
      size={typeof size === "number" ? size : getFontSize(size)}
      style={[{ fontFamily: font || "rubik" }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const {
    backgroundColor,
    height,
    width,
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    backgroundColor
  );
  return (
    <DefaultView
      height={Layouts["dim"](height, "h")}
      width={Layouts["dim"](width, "w")}
      style={[{ backgroundColor: background }, style]}
      {...otherProps}
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    background,
    height,
    width,
    style,
    lightColor,
    darkColor,
    color,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );
  console.log("but", height);
  return (
    <DefaultButton
      style={[
        {
          backgroundColor,
          // width: width && Layouts["dim"](width, "w"),
          // height: height && Layouts["dim"](height, "h"),
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
