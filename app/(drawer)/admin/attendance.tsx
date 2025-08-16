import AttendanceList from "@/components/AttendanceList";
import SimpleSelectOption from "@/components/SimpleSelectOption";
import { monthlyFilter, YearlyFilter } from "@/constants/FilterOptions";
import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Input } from "tamagui";

const filterData = [
  { id: 9789, name: "Daily" },
  { id: 6895, name: "Monthly" },
  { id: 7896, name: "Yearly" },
];

const width = Dimensions.get("window").width;
export default function AttendancePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterOption, setFilterOption] = useState("Daily");

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
        <View className="my-5 flex-col gap-2 items-center justify-between">
          <View className="w-full">
            <SimpleSelectOption
              data={filterData}
              label="Select filter option..."
              value={filterOption}
              setValue={setFilterOption}
            />
          </View>
          <View className="flex-row gap-3 flex-wrap items-center justify-start w-full">
            {filterOption === "Monthly" &&
              monthlyFilter.map((item) => (
                <Pressable
                  key={item.id}
                  className="py-2 px-3 bg-gray-200 rounded-lg"
                >
                  <Text className="font-[RobotoRegular] text-lg">
                    {item.name}
                  </Text>
                </Pressable>
              ))}
          </View>
          <View className="w-full">
            <Input placeholder="Name or Team or Status" />
          </View>
        </View>

        <AttendanceList />
      </View>
    </ScrollView>
  );
}
