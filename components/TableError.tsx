import React from "react";
import { Text, View } from "react-native";

interface Props {
  error?: string;
}

const TableError = ({ error }: Props) => {
  return (
    <View className="flex-1 justify-center items-center w-full h-[100px]">
      <Text className="text-center text-lg text-red-600 italic">
        {error || "Something went wrong!!"}
      </Text>
    </View>
  );
};

export default TableError;
