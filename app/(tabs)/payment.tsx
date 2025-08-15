import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const PaymentPage = () => {
  const transactions = [
    { id: 1, date: "2025-08-01", amount: 200, status: "Paid" },
    { id: 2, date: "2025-07-15", amount: 200, status: "Paid" },
    { id: 3, date: "2025-07-01", amount: 200, status: "Pending" },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Summary */}
      <View className="bg-white rounded-xl shadow-md p-5 mb-5">
        <Text className="text-lg font-bold text-slate-800 mb-2">
          Payment Summary
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-xl font-bold text-green-700">Rp 400.000</Text>
            <Text className="text-xs text-slate-500">Paid</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-red-700">Rp 100.000</Text>
            <Text className="text-xs text-slate-500">Due</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-yellow-600">
              Rp 250.000
            </Text>
            <Text className="text-xs text-slate-500">Pending</Text>
          </View>
        </View>
      </View>

      {/* Transactions */}
      <View className="bg-white rounded-xl shadow-md p-5">
        <Text className="text-lg font-bold text-slate-800 mb-3">
          Transactions
        </Text>
        {transactions.map((t) => (
          <View
            key={t.id}
            className="flex-row justify-between items-center border-b border-slate-200 py-3"
          >
            <View>
              <Text className="text-sm text-slate-700 font-medium">
                {t.date}
              </Text>
              <Text className="text-xs text-slate-500">Rp {t.amount}</Text>
            </View>
            <Text
              className={`text-sm font-semibold ${
                t.status === "Paid"
                  ? "text-green-600"
                  : t.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {t.status}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <Pressable className="bg-orange-600 p-4 rounded-xl mt-6 items-center">
        <Text className="text-white font-bold">Pay Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default PaymentPage;
