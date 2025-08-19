import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}
const profilePicture = require("@/assets/images/profile-picture.jpg");

const TeamDataModal = ({
  item,
  setVisibleModal,
  setVisibleEditModal,
}: Props) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#000000d2] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Update Team Data
        </Text>
        <Text className="font-[RobotoRegular] text-gray-600 text-center text-lg font-medium">
          ID: {item.teamId}
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="w-40 h-40 rounded-lg border p-2 mb-3 mx-auto">
            <Image
              source={profilePicture}
              className="w-full h-full object-cover rounded-lg"
            />
          </View>
          <Text className="text-xl font-bold font-[RobotoRegular] text-center">
            {item.name}
          </Text>
          <Text className="text-lg text-gray-600 font-[RobotoRegular] text-center">
            {item.description}
          </Text>
        </View>
        <View className="flex-row gap-5 justify-end items-center mt-5">
          <Pressable
            className="bg-orange-600 py-2 px-3 rounded-lg mt-5 flex-row gap-2 items-center justify-center "
            onPress={() => {
              setVisibleModal(false);
              setVisibleEditModal(true);
            }}
          >
            <Save size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Update
            </Text>
          </Pressable>
          <Pressable
            className="bg-red-600 py-2 px-3 rounded-lg mt-5 flex-row gap-1 items-center justify-center "
            onPress={() => setVisibleModal(false)}
          >
            <CircleX size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TeamDataModal;
