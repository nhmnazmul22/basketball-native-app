import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

const Loading = () => {
  const { session } = useAuth();

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
