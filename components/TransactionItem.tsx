import { Eye } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  item: any;
}

const TransactionItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <View className="flex-row gap-2 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.TrxId}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.studentName}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.team || "-"}
      </Text>
      <Text className="w-20 text-md capitalize text-center font-[RobotoRegular]">
        {item.amount}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.paymentMethod}
      </Text>
      <Text className="w-24 text-md text-center font-[RobotoRegular]">
        {item.status}
      </Text>
      <Text className="w-24 text-md text-center font-[RobotoRegular]">
        {item.date}
      </Text>
      <View className="w-24 flex-row justify-center items-start gap-3">
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
              Transaction Data
            </Text>
            <Text className="font-[RobotoRegular] text-center text-xl font-medium">
              {item.TrxId}
            </Text>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b ">
                Student Info:
              </Text>
              <View>
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                    Name:
                  </Text>
                  <Text className="text-lg font-[RobotoRegular]">
                    {item.studentName}
                  </Text>
                </View>
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                    Team:
                  </Text>
                  <Text className="text-lg font-[RobotoRegular]">
                    {item.team}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b">
                Payment Info:
              </Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                      Amount:
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {item.amount} Rp
                    </Text>
                  </View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                      Method:
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {item.paymentMethod}
                    </Text>
                  </View>
                </View>
                <View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                      Date:
                    </Text>
                    <Text className="text-lg font-[RobotoRegular]">
                      {item.date}
                    </Text>
                  </View>
                  <View className="flex-row gap-3 ">
                    <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                      Status:
                    </Text>
                    <Text
                      className={`text-lg font-[RobotoRegular] ${item.status === "Paid" ? "text-green-600" : item.status === "Pending" ? "text-orange-600" : "text-red-600"}`}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-bold font-[RobotoRegular] border-b">
                Remark:
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-3 ">
                  <Text className="text-lg font-[RobotoRegular] italic">
                    {item.remarks}
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
