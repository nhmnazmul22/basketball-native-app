import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}

const AnnouncementEditModal = ({
  item,
  setVisibleModal,
  setVisibleEditModal,
}: Props) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#00000051] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Announcement Details
        </Text>
        <Text className="font-[RobotoRegular] text-center text-xl font-medium">
          {item.Aid}
        </Text>
        <View className="mt-5 flex-col gap-2">
          <Text className="text-xl font-[RobotoRegular] font-bold text-blue-900">
            {item.title}
          </Text>
          <Text className="text-lg font-[RobotoRegular]">{item.message}</Text>
        </View>
        <View className="mt-5 flex-col gap-1">
          <Text className="text-lg font-bold font-[RobotoRegular] border-b ">
            Other Info
          </Text>
          <View className="flex-row gap-3">
            <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
              Team
            </Text>
            <Text className="text-lg font-[RobotoRegular]">:</Text>
            <Text className="text-lg font-[RobotoRegular]">{item.team}</Text>
          </View>
          <View className="flex-row gap-3">
            <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
              Date
            </Text>
            <Text className="text-lg font-[RobotoRegular]">:</Text>
            <Text className="text-lg font-[RobotoRegular]">{item.date}</Text>
          </View>
          <View className="flex-row gap-3">
            <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
              Status
            </Text>
            <Text className="text-lg font-[RobotoRegular]">:</Text>
            <Text className="text-lg font-[RobotoRegular]">{item.status}</Text>
          </View>
          <View className="flex-row gap-3">
            <Text className="text-lg font-[RobotoRegular] w-20 font-bold">
              Created
            </Text>
            <Text className="text-lg font-[RobotoRegular]">:</Text>
            <Text className="text-lg font-[RobotoRegular]">
              {item.createdBy}
            </Text>
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

export default AnnouncementEditModal;
