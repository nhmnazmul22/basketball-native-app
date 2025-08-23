import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { useAuth } from "@/context/AuthContext";
import { firstWordUpper, formatCurrency, formateDateTime } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchTransactions } from "@/store/TransactionSlice";
import { Transaction } from "@/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PaymentPage = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [myPayments, setMyPayments] = useState<Transaction[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: payments,
    error,
    loading,
  } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  useEffect(() => {
    if (payments?.data) {
      const myPayments = payments.data.filter(
        (pay) => pay.studentId === session.user_id && pay.type === "penghasilan"
      );

      if (myPayments.length > 0) {
        setMyPayments(myPayments);
      }
    }
  }, [payments?.data, session.user_id]);

  const totalPaid = myPayments
    .filter((pay) => pay.status === "dibayar")
    .reduce((prevAmount, pay) => pay.amount + prevAmount, 0);

  const totalPending = myPayments
    .filter((pay) => pay.status === "menunggu")
    .reduce((prevAmount, pay) => pay.amount + prevAmount, 0);

  const totalCancel = myPayments
    .filter((pay) => pay.status === "dibatalkan")
    .reduce((prevAmount, pay) => pay.amount + prevAmount, 0);

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Summary */}
      <View className="bg-white rounded-xl shadow-md p-5 mb-5">
        <Text className="text-lg font-bold text-slate-800 mb-2  font-[RobotoRegular]">
          Ringkasan Pembayaran
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-xl font-bold text-green-700 font-[RobotoRegular]">
              {formatCurrency(totalPaid)}
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Dibayar
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-yellow-600 font-[RobotoRegular]">
              {formatCurrency(totalPending)}
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Tertunda
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-red-700 font-[RobotoRegular]">
              {formatCurrency(totalCancel)}
            </Text>
            <Text className="text-xs text-slate-500 font-[RobotoRegular]">
              Membatalkan
            </Text>
          </View>
        </View>
      </View>

      {/* Transactions */}
      <View className="bg-white rounded-xl shadow-md p-5">
        <Text className="text-lg font-bold text-slate-800 mb-3 font-[RobotoRegular]">
          Transaksi
        </Text>
        {myPayments.map((t) => (
          <View
            key={t._id}
            className="flex-row justify-between items-center border-b border-slate-200 py-3"
          >
            <View>
              <Text className="text-sm text-slate-700 font-medium font-[RobotoRegular]">
                {formateDateTime(t.createdAt)}
              </Text>
              <Text className="text-xs text-slate-500 font-[RobotoRegular]">
                {formatCurrency(t.amount)}
              </Text>
            </View>
            <Text
              className={`text-sm font-semibold font-[RobotoRegular] ${
                t.status === "dibayar"
                  ? "text-green-600"
                  : t.status === "menunggu"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {firstWordUpper(t.status)}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <Pressable
        className="bg-orange-600 p-4 rounded-xl mt-6 items-center"
        onPress={() => router.push("/createPayment")}
      >
        <Text className="text-white font-bold font-[RobotoRegular]">
          Bayar sekarang
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default PaymentPage;
