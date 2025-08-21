import React from "react";
import { ActivityIndicator, View } from "react-native";

const TableLoading = () => {
  return (
    <View className="flex-1 justify-center items-center w-full h-[80px] mx-auto">
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

export default TableLoading;
