import { SelectOptions } from "@/components/SelectItems";
import UserList from "@/components/UserList";
import { Download } from "lucide-react-native";
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
export default function UserManagementPage() {
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
      className="flex-1 p-5 bg-white"
    >
      <View className=" mt-3">
        <View className="flex-row justify-between items-center ">
          <Text className=" font-[BebasNeue] text-2xl tracking-wider">
            Users stats,
          </Text>
          <Pressable className="bg-orange-500 px-4 py-2 rounded-lg flex-row gap-2 items-center">
            <Download size={18} color="#ffffff" />
            <Text className="text-base text-white ">Export PDF</Text>
          </Pressable>
        </View>
        <View className="mb-5 mt-8 flex-row items-center justify-between">
          <View style={{ width: width * 0.5 }}>
            <Input placeholder="UserId, name, email..." />
          </View>
          <View style={{ width: width * 0.4 }}>
            <SelectOptions data={filterData} />
          </View>
        </View>
        <UserList />
      </View>
    </ScrollView>
  );
}
