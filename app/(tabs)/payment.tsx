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
        <Text className="text-lg font-bold text-slate-800 mb-2  font-[RobotoRegular]">
          Payment Summary
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-xl font-bold text-green-700 font-[RobotoRegular]">
              Rp 400.000
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Paid
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-red-700 font-[RobotoRegular]">
              Rp 100.000
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Due
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-yellow-600 font-[RobotoRegular]">
              Rp 250.000
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Pending
            </Text>
          </View>
        </View>
      </View>

      {/* Transactions */}
      <View className="bg-white rounded-xl shadow-md p-5">
        <Text className="text-lg font-bold text-slate-800 mb-3 font-[RobotoRegular]">
          Transactions
        </Text>
        {transactions.map((t) => (
          <View
            key={t.id}
            className="flex-row justify-between items-center border-b border-slate-200 py-3"
          >
            <View>
              <Text className="text-sm text-slate-700 font-medium font-[RobotoRegular]">
                {t.date}
              </Text>
              <Text className="text-xs text-slate-500 font-[RobotoRegular]">
                Rp {t.amount}
              </Text>
            </View>
            <Text
              className={`text-sm font-semibold font-[RobotoRegular] ${
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
        <Text className="text-white font-bold font-[RobotoRegular]">
          Pay Now
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default PaymentPage;
