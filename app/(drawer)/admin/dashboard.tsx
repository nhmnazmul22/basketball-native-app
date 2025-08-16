import AnnounceMentItem from "@/components/AnnounceMentItem";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const announcementData = [
  {
    Aid: "ANN001",
    title: "Training Session Reminder",
    message:
      "U15 team training tomorrow at 5:00 PM, Court 2. Bring your own water bottle.",
    team: "U15",
    date: "2025-08-12",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
];

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: "100%", paddingBottom: 60 }}
    >
      <View className="flex-row flex-wrap gap-4 px-6 mt-10">
        <View className="bg-orange-600 flex-1 min-w-[150px] p-4 rounded-lg">
          <Text className="text-lg text-white font-[RobotoRegular]">
            Total Student
          </Text>
          <Text className="text-3xl text-white font-[BebasNeue]">20</Text>
        </View>
        <View className="bg-indigo-600 flex-1 min-w-[150px] p-4 rounded-lg">
          <Text className="text-lg text-white font-[RobotoRegular]">
            Total Couch
          </Text>
          <Text className="text-3xl text-white font-[BebasNeue]">5</Text>
        </View>
        <View className="bg-amber-500 flex-1 min-w-[150px] p-4 rounded-lg">
          <Text className="text-lg text-white font-[RobotoRegular]">
            Payments Pending
          </Text>
          <Text className="text-3xl text-white font-[BebasNeue]">
            20,000 Rp
          </Text>
        </View>
        <View className="bg-green-600 flex-1 min-w-[150px] p-4 rounded-lg">
          <Text className="text-lg text-white font-[RobotoRegular]">
            Net Income
          </Text>
          <Text className="text-3xl text-white font-[BebasNeue]">
            200.000 Rp
          </Text>
        </View>
      </View>

      <View className="px-6 mt-10">
        <Text className="text-2xl font-[BebasNeue] mb-3 tracking-wider">
          Attendance Overview
        </Text>
        <View className="bg-white rounded-lg p-5 border border-slate-200 items-center">
          <Text className="text-5xl font-[BebasNeue] text-green-600">85%</Text>
          <Text className="text-gray-500 font-[RobotoRegular] mt-1">
            This Month
          </Text>
          <View className="flex-row justify-between w-full mt-5">
            <View className="items-center flex-1">
              <Text className="text-lg font-bold">20</Text>
              <Text className="text-gray-500">Present</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-lg font-bold">2</Text>
              <Text className="text-gray-500">Absent</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-lg font-bold">3</Text>
              <Text className="text-gray-500">Late</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 mt-10">
        <Text className="text-2xl font-[BebasNeue] mb-3 tracking-wider">
          Latest Announcement
        </Text>
        <View className="flex-col gap-5 mt-5">
          {announcementData.map((item, index) => (
            <AnnounceMentItem key={item.Aid} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
