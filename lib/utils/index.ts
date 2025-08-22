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

export const firstWordUpper = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const generateFileName = (uri: string) => {
  const parts = uri.split("/");
  const fileName = parts[parts.length - 1];
  const newFileName = fileName.split(" ").join("-");
  return newFileName;
};

export const formateDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = new Date(date).toLocaleTimeString("en-US", options);
  return formattedTime;
};

export const formateDateTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDateTime = new Date(date).toLocaleString("en-US", options);
  return formattedDateTime;
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

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    const formattedNum = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(0);

    return formattedNum.split(".").join(",");
  }
  const formattedNum = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedNum.split(".").join(",");
}
