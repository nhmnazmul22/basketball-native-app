import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Input, Label } from "tamagui";
import { SelectOptions } from "./SelectItems";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const profilePicture = require("@/assets/images/profile-picture.jpg");
const UserDateUpdateModal = ({ item, setVisibleModal }: Props) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#000000d2] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Update User Data
        </Text>
        <Text className="font-[RobotoRegular] text-center text-xl font-medium">
          {item.userId}
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            <View className="w-36 h-36 rounded-lg border p-2 mb-3">
              <Image
                source={profilePicture}
                className="w-full h-full object-cover rounded-lg"
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="name"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Name:
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="name"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Date of Birth (DOB):
              </Label>
              <Pressable onPress={() => setShow(true)}>
                <Input
                  className="text-lg font-[RobotoRegular]"
                  placeholder="Enter your name"
                  readOnly
                  value={date.toLocaleDateString()}
                  onChangeText={(text) => setName(text)}
                />
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="name"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Team
              </Label>
              <SelectOptions />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="role"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Role:
              </Label>
              <Input
                id="role"
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter Role"
                value={role}
                onChangeText={(text) => setRole(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="email"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Email:
              </Label>
              <Input
                id="email"
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                htmlFor="phone"
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Phone:
              </Label>
              <Input
                id="phone"
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
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

export default UserDateUpdateModal;
