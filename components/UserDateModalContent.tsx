import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}

const profilePicture = require("@/assets/images/profile-picture.jpg");
const UserDateModalContent = ({
  item,
  setVisibleModal,
  setVisibleEditModal,
}: Props) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#000000d2] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          User Data
        </Text>
        <Text className="font-[RobotoRegular] text-center text-xl font-medium">
          {item.userId}
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <Text className="text-lg font-bold font-[RobotoRegular] border-b ">
            Student Info:
          </Text>
          <View>
            <View className="w-36 h-36 rounded-lg border p-2 mb-3">
              <Image
                source={profilePicture}
                className="w-full h-full object-cover rounded-lg"
              />
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                Name
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">{item.name}</Text>
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
                DOB
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">{item.dob}</Text>
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                Team
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">{item.team}</Text>
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                Role
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">
                {item.role[0].toUpperCase() + item.role.slice(1)}
              </Text>
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                Email
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">{item.email}</Text>
            </View>
            <View className="flex-row gap-3 ">
              <Text className="text-lg font-[RobotoRegular] w-20 font-bold ">
                Phone
              </Text>
              <Text className="text-lg font-[RobotoRegular]">:</Text>
              <Text className="text-lg font-[RobotoRegular]">{item.phone}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-5 justify-end items-center">
          <Pressable
            className="bg-orange-600 w-24 py-2 rounded-lg mt-5 flex-row gap-2 items-center justify-center"
            onPress={() => {
              setVisibleModal(false);
              setVisibleEditModal(true);
            }}
          >
            <Edit size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Edit
            </Text>
          </Pressable>
          <Pressable
            className="bg-red-600 w-24 py-2 rounded-lg mt-5 flex-row gap-1 items-center justify-center"
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

export default UserDateModalContent;
