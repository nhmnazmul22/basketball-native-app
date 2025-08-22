import TransactionList from "@/components/TransationList";
import { AppDispatch } from "@/store";
import { fetchTransactions } from "@/store/TransactionSlice";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

export default function TransactionPage() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchTransactions());
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
      <View className=" mt-3">
        <TransactionList />
      </View>
    </ScrollView>
  );
}
