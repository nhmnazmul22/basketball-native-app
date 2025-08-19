import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Input, TextArea } from "tamagui";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const profilePicture = require("@/assets/images/profile-picture.jpg");

const TeamDateUpdateModal = ({ item, setVisibleModal }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(item.name);
    setDescription(item.description);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#000000d2]">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Update Team Data
        </Text>
        <Text className="font-[RobotoRegular] text-gray-600 text-center text-lg font-medium">
          ID: {item.teamId}
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            <View className="flex-col gap-3 p-2 w-40">
              <Image
                source={profilePicture}
                className="w-40 h-40 object-cover rounded-lg border border-slate-200"
              />
              <Pressable
                className="bg-orange-600 px-4 py-2 rounded-md"
                onPress={() => {}}
              >
                <Text className="text-white font-bold text-center">
                  Add Logo
                </Text>
              </Pressable>
            </View>
            <View className="flex-col gap-1">
              <Text className="text-lg font-[RobotoRegular] text-black">
                Team Name: <Text className="text-orange-600">*</Text>
              </Text>
              <Input
                placeholder="Enter team name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View className="flex-col gap-1">
              <Text className="text-lg font-[RobotoRegular] text-black">
                Team Description:
              </Text>
              <TextArea
                placeholder="Some description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
          </View>
        </View>
        <View className="flex-row gap-5 justify-end items-center">
          <Pressable
            className="bg-orange-600 py-2 px-3 rounded-lg mt-5 flex-row gap-2 items-center justify-center "
            onPress={() => {}}
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

export default TeamDateUpdateModal;
