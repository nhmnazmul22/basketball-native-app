import SimpleSelectOption from "@/components/SimpleSelectOption";
import { shortText } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Label } from "tamagui";

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
  {
    Aid: "ANN002",
    title: "Battle Match Announcement",
    message:
      "U12 vs U15 friendly match scheduled for August 20 at 4:00 PM, Main Court.",
    team: "All Teams",
    date: "2025-08-10",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
  {
    Aid: "ANN003",
    title: "Payment Reminder",
    message:
      "August membership fee is due by August 15. Please pay via the app or to your coach.",
    team: "All Students",
    date: "2025-08-09",
    createdBy: "Coach Liam",
    isPin: false,
    status: "Active",
  },
  {
    Aid: "ANN004",
    title: "Holiday Notice",
    message: "No training on August 25 due to facility maintenance.",
    team: "All Teams",
    date: "2025-08-08",
    createdBy: "Admin",
    isPin: false,
    status: "Archived",
  },
];

const filterData = [
  { id: 23543, name: "Active" },
  { id: 23343, name: "Archived" },
];

export default function AnnouncementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("Active");
  const [visibleModal, seVisibleModal] = useState(false);

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
      className="flex-1 p-5 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 40,
      }}
    >
      <View className="mt-3 flex-1">
        <View className="flex-row gap-2 justify-between items-center">
          <View className="w-[48%]">
            <Label unstyled className="font-[RobotoRegular]">
              Select Filter Type:
            </Label>
            <SimpleSelectOption
              data={filterData}
              label="Select Filter Type"
              value={filterType}
              setValue={setFilterType}
            />
          </View>
          <View className="w-[48%]">
            <Label unstyled className="font-[RobotoRegular]">
              Select Filter Type:
            </Label>
            <SimpleSelectOption
              data={filterData}
              label="Select Filter Type"
              value={filterType}
              setValue={setFilterType}
            />
          </View>
        </View>
        <View className="flex-col gap-5 mt-5">
          {announcementData.map((item, index) => (
            <Pressable key={item.Aid}>
              <View className="bg-slate-200 p-5 rounded-lg shadow-md elevation-md">
                <Text className="text-xl text-blue-900 font-bold font-[RobotoRegular] flex-row gap-2 items-center">
                  {item.title}
                </Text>

                <Text className="text-base mt-2 font-thin font-[RobotoRegular]">
                  {shortText(item.message, 140)}
                </Text>
                <View className="mt-3 flex-row gap-5 justify-between items-center">
                  <Text className="text-base font-[RobotoRegular]">
                    <Text className="font-bold">Date:</Text> {item.date}
                  </Text>
                  <Text className="text-base font-[RobotoRegular]">
                    <Text className="font-bold">Create By:</Text>{" "}
                    {item.createdBy}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
