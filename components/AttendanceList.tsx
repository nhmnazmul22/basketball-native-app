import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import AttendanceItem from "./AttendanceItem";

const attendanceData = [
  {
    date: "2025-08-07",
    name: "Ahmad Yusuf",
    team: "U12",
    time: "08:12",
    status: "present",
    locationVerified: true,
    faceMatch: 0.92,
  },
  {
    date: "2025-08-07",
    name: "Budi Santoso",
    team: "U15",
    time: null,
    status: "absent",
    locationVerified: false,
    faceMatch: null,
  },
  {
    date: "2025-08-07",
    name: "Budi Santoso",
    team: "U15",
    time: null,
    status: "absent",
    locationVerified: false,
    faceMatch: null,
  },
];

const AttendanceList = () => {
  return (
    <ScrollView horizontal className="pb-4">
      <View>
        {/* Table Header */}
        <View className="flex-row gap-2 bg-gray-100 p-2 rounded-t">
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            Name
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Team
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Time
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Status
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            GPS
          </Text>
          <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
            Face Match
          </Text>
          <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
            Actions
          </Text>
        </View>
        {/* Table Rows */}
        <FlatList
          data={attendanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <AttendanceItem item={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default AttendanceList;
