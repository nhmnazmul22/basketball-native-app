import AttendanceList from "@/components/AttendanceList";
import { SelectOptions } from "@/components/SelectItems";
import React, { useCallback, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Input } from "tamagui";

const width = Dimensions.get("window").width;
export default function AttendancePage() {
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
      className="flex-1 p-4 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 40,
      }}
    >
      <View className="">
        <Text className=" font-[BebasNeue] text-2xl tracking-wider">
          Today Attendance,
        </Text>
        <View className="my-5 flex-row items-center justify-between">
          <View style={{ width: width * 0.5 }}>
            <Input placeholder="Name or Team or Status" />
          </View>
          <View style={{ width: width * 0.4 }}>
            <SelectOptions />
          </View>
        </View>

        <AttendanceList />
      </View>
    </ScrollView>
  );
}
