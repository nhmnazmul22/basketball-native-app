import {
  formatCurrency,
  formateDate,
  formateDateTime,
  shortText,
} from "@/lib/utils";
import { Transaction } from "@/types";
import { Eye } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  item: Transaction;
}

const TransactionItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <View className="flex-row gap-2 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {shortText(item._id, 10)}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.studentInfo.fullName}
      </Text>
      <Text className="w-28 text-md capitalize text-center font-[RobotoRegular]">
        {item.amount}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.method}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.status}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {formateDateTime(item.createdAt)}
      </Text>
      <View className="w-28 flex-row justify-center items-start gap-3">
        <Pressable
          className="bg-orange-500 px-2 py-2 rounded"
          onPress={() => setVisibleModal(true)}
        >
          <Eye size={22} color="#ffffff" />
        </Pressable>
      </View>

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          setVisibleModal(!visibleModal);
        }}
      >
        <View className="flex-1 justify-center items-center bg-[#000000d2] py-16">
          <View className="w-[90%] bg-white p-5 rounded-lg">
            <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
              Data transaksi
            </Text>
            <Text className="font-[RobotoRegular] text-center text-xl font-medium">
              {item._id}
            </Text>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b ">
                Info Siswa:{" "}
              </Text>
              <View>
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                    Nama:
                  </Text>
                  <Text className="text-lg font-[RobotoRegular]">
                    {item.studentInfo.fullName}
                  </Text>
                </View>
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                    Email:
                  </Text>
                  <Text className="text-lg font-[RobotoRegular]">
                    {item.studentInfo.email}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b">
                Info Pembayaran:
              </Text>
              <View className="flex-col gap-1 justify-between items-start">
                <View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                      Jumlah
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">:</Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {formatCurrency(item.amount)}
                    </Text>
                  </View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                      Metode
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">:</Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {item.method[0].toUpperCase() + item.method.slice(1)}
                    </Text>
                  </View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                      Jenis
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">:</Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {item.type[0].toUpperCase() + item.type.slice(1)}
                    </Text>
                  </View>
                </View>
                <View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                      Tanggal
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">:</Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {formateDateTime(item.createdAt)}
                    </Text>
                  </View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                      Status
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">:</Text>
                    <Text
                      className={`text-lg font-[RobotoRegular] ${item.status === "dibayar" ? "text-green-600" : item.status === "menunggu" ? "text-orange-600" : "text-red-600"}`}
                    >
                      {item.status[0].toUpperCase() + item.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b">
                Komentar:
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] italic">
                    {item.remark}
                  </Text>
                </View>
              </View>
            </View>
            <Pressable
              className="bg-orange-600 w-24 py-2 rounded-lg ms-auto mt-5"
              onPress={() => setVisibleModal(false)}
            >
              <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionItem;
