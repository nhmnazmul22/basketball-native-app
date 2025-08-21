import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store";
import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const Loading = () => {
  const { session } = useAuth();
  const { items } = useSelector((state: RootState) => state.user);

  if (items?.data.status === "inactive") {
    Toast.show({
      type: "error",
      text1: "Account Inactive",
      text2: "Your account is inactive. Please contact with admin.",
    });
    return <Redirect href="/login" />;
  }

  if (session && (session.role === "admin" || session.role === "coach")) {
    return <Redirect href="/admin/dashboard" />;
  }

  if (session && session.role === "student") {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-[RobotoRegular] text-gray-500">
        Redirecting...
      </Text>
    </View>
  );
};

export default Loading;
