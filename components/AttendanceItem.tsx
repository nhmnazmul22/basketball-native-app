import { Bell, CircleCheck, CircleX } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AttendanceItemProps {
  item: any;
}

const AttendanceItem = ({ item }: AttendanceItemProps) => {
  return (
    <View className="flex-row gap-2 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.name}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.team}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.time || "-"}
      </Text>
      <Text className="w-20 text-md capitalize text-center font-[RobotoRegular]">
        {item.status}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.locationVerified ? (
          <CircleCheck color="green" size={22} />
        ) : (
          <CircleX color="red" size={22} />
        )}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.faceMatch ? (
          `${Math.round(item.faceMatch * 100)}%`
        ) : (
          <CircleX color="red" size={22} />
        )}
      </Text>
      <View className="w-24 flex-row justify-center items-start gap-3">
        <Pressable className="bg-orange-500 p-2 rounded">
          <Bell size={22} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
};

export default AttendanceItem;
