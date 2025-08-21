import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";

export const shortText = (text: String, length: number) => {
  const newText = text.slice(0, length);
  if (text.length > length) {
    return `${newText}...`;
  }
  return newText;
};

export const saveData = async (value: { token: string }) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("auth-token", jsonValue);
    return;
  } catch (e: any) {
    console.log(e);
    Toast.show({
      type: "error",
      text1: "Auth session saved failed",
      text2: e.message && e.message,
    });
    return;
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("auth-token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: any) {
    console.log(e);
    Toast.show({
      type: "error",
      text1: "Auth session getting error",
      text2: e.message && e.message,
    });
    return;
  }
};

export const removeData = async () => {
  try {
    const isRemoved = await AsyncStorage.removeItem("auth-token");
    return isRemoved;
  } catch (e: any) {
    console.log(e);
    Toast.show({
      type: "error",
      text1: "Auth session remove error",
      text2: e.message && e.message,
    });
    return;
  }
};

export const decodeToken = (token: string) => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  return decoded;
};
