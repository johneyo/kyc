import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export const isEmptyObj = (obj) =>
  (obj !== null || obj !== undefined) &&
  Object.entries(obj).length === 0 &&
  obj.constructor === Object;
export const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
export const _pickImage = async (mode, callback) => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
  }

  if (mode === "Camera") {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        callback(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  } else if (mode === "Media") {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        callback(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  } else {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        callback(result);
      }
    } catch (E) {
      console.log(E);
    }
  }
};
