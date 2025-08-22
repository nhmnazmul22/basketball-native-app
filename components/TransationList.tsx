import { AppDispatch, RootState } from "@/store";
import { fetchTransactions } from "@/store/TransactionSlice";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "tamagui";
import TableError from "./TableError";
import TableLoading from "./TableLoading";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const [searchParams, setSearchParams] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.transactions
  );

  const filteredTransaction = items?.data.filter((tran) => {
    const search = searchParams.toLowerCase();

    if (searchParams) {
      return (
        //@ts-ignore
        tran._id.toLowerCase().includes(search) ||
        tran.studentInfo.fullName.toLowerCase().includes(search) ||
        tran.studentInfo.email.toLowerCase().includes(search) ||
        tran.status?.toLowerCase().includes(search)
      );
    } else {
      return true;
    }
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <>
      <View className="mb-5 flex-row items-center justify-between">
        <View className="w-full">
          <Input placeholder="TrxId, Name, Team..." />
        </View>
      </View>
      <ScrollView horizontal className="pb-4">
        <View>
          {/* Table Header */}
          <View className="flex-row gap-2 bg-gray-100 p-2 rounded-t">
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              TrxId
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Murid
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Jumlah
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Metode
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              status
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Tanggal
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Tindakann
            </Text>
          </View>
          {/* Table Rows */}
          <FlatList
            data={filteredTransaction}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TransactionItem item={item} />}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default TransactionList;
