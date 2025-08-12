import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import TransactionItem from "./TransactionItem";

const transactionData = [
  {
    TrxId: "TXN001",
    studentName: "John Carter",
    team: "U12",
    amount: 50,
    paymentMethod: "Cash",
    status: "Paid",
    date: "2025-08-10",
    remarks: "Monthly training fee",
  },
  {
    TrxId: "TXN002",
    studentName: "Liam Smith",
    team: "U15",
    amount: 75,
    paymentMethod: "Bank Transfer",
    status: "Pending",
    date: "2025-08-12",
    remarks: "Tournament participation fee",
  },
  {
    TrxId: "TXN003",
    studentName: "Emma Brown",
    team: "U12",
    amount: 50,
    paymentMethod: "QRIS",
    status: "Paid",
    date: "2025-08-08",
    remarks: "Monthly training fee",
  },
  {
    TrxId: "TXN004",
    studentName: "Noah Johnson",
    team: "U15",
    amount: 120,
    paymentMethod: "Card",
    status: "Paid",
    date: "2025-08-01",
    remarks: "Annual jersey payment",
  },
];

const TransactionList = () => {
  return (
    <ScrollView horizontal className="pb-4">
      <View>
        {/* Table Header */}
        <View className="flex-row gap-2 bg-gray-100 p-2 rounded-t">
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            TrxId
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Student
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Team
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Amount
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Method
          </Text>
          <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
            Status
          </Text>
          <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
            Date
          </Text>
          <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
            Actions
          </Text>
        </View>
        {/* Table Rows */}
        <FlatList
          data={transactionData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TransactionItem item={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default TransactionList;
