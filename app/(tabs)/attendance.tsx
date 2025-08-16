import React from "react";
import { FlatList, Text, View } from "react-native";

const attendanceSummary = {
  present: 18,
  absent: 2,
  late: 1,
};

const attendanceLogs = [
  {
    id: "1",
    date: "2025-08-15",
    time: "09:05 AM",
    status: "Present",
    method: "Face",
  },
  {
    id: "2",
    date: "2025-08-14",
    time: "09:12 AM",
    status: "Late",
    method: "Location",
  },
  {
    id: "3",
    date: "2025-08-13",
    time: "09:00 AM",
    status: "Present",
    method: "Face",
  },
  { id: "4", date: "2025-08-12", time: "—", status: "Absent", method: "—" },
];

const Attendance = () => {
  const renderLogItem = ({ item }: any) => (
    <View className="flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3">
      <View>
        <Text className="text-base font-semibold text-slate-800 font-[RobotoRegular]">
          {item.date}
        </Text>
        <Text className="text-sm text-slate-500 font-[RobotoRegular]">
          {item.time}
        </Text>
      </View>
      <View className="items-end">
        <Text
          className={`text-sm font-bold px-3 py-1 rounded-full font-[RobotoRegular] ${
            item.status === "Present"
              ? "bg-green-100 text-green-700"
              : item.status === "Absent"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </Text>
        <Text className="text-xs text-slate-500 mt-1 font-[RobotoRegular]">
          {item.method !== "—" ? `By ${item.method}` : ""}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-5">
      {/* Today’s Status */}
      <View className="bg-white rounded-xl shadow-lg p-5 mb-5">
        <Text className="text-lg font-bold text-slate-800 mb-2 font-[RobotoRegular]">
          Today’s Attendance
        </Text>
        <Text className="text-2xl font-extrabold text-green-600 font-[RobotoRegular]">
          Present
        </Text>
        <Text className="text-sm text-slate-500">
          Marked at 09:05 AM via Face
        </Text>
      </View>

      {/* Summary */}
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mx-1 bg-green-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-green-700 font-[RobotoRegular]">
            {attendanceSummary.present}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Present
          </Text>
        </View>
        <View className="flex-1 mx-1 bg-red-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-red-700 font-[RobotoRegular]">
            {attendanceSummary.absent}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Absent
          </Text>
        </View>
        <View className="flex-1 mx-1 bg-yellow-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-yellow-700 font-[RobotoRegular]">
            {attendanceSummary.late}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Late
          </Text>
        </View>
      </View>

      {/* Recent Logs */}
      <Text className="text-lg font-bold text-slate-800 mb-3 font-[RobotoRegular]">
        Recent Logs
      </Text>
      <FlatList
        data={attendanceLogs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Attendance;
