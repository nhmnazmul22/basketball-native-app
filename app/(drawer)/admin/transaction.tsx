import { SelectOptions } from "@/components/SelectItems";
import TransactionList from "@/components/TransationList";
import { Download } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Input } from "tamagui";

const width = Dimensions.get("window").width;
export default function TransactionPage() {
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
            Today Transactions,
          </Text>
          <Pressable className="bg-orange-500 px-4 py-2 rounded-lg flex-row gap-2 items-center">
            <Download size={18} color="#ffffff" />
            <Text className="text-base text-white font-[RobotoRegular]">
              Export PDF
            </Text>
          </Pressable>
        </View>
        <View className="mb-5 mt-8 flex-row items-center justify-between">
          <View style={{ width: width * 0.5 }}>
            <Input placeholder="TrxId, Name, Team..." />
          </View>
          <View style={{ width: width * 0.4 }}>
            <SelectOptions />
          </View>
        </View>

        <TransactionList />
      </View>
    </ScrollView>
  );
}
