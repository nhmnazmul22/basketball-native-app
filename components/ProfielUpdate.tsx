import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Input, Label } from "tamagui";

interface Props {
  item: any;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}

const ProfileUpdateModal = ({ item, setVisibleEditModal }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setEmail(item.email || "");
      setPhone(item.phone || "");
      setDate(item.date ? new Date(item.date) : new Date());
    }
  }, [item]);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (mode === "date") {
      setDate(selectedDate || date);
      setMode("time");
      setShow(true);
    } else {
      setDate(selectedDate || date);
      setShow(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#00000070] px-4">
      <View className="w-full max-h-[85%] bg-white p-5 rounded-2xl shadow-lg">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
            Update Profile
          </Text>

          <View className="mt-5 flex-col gap-4">
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Name
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter full name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Email
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Phone
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter whatsapp number"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            {/* Date */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Date of Birth
              </Label>
              <Pressable
                onPress={() => {
                  setMode("date");
                  setShow(true);
                }}
              >
                <Input
                  readOnly
                  className="text-lg font-[RobotoRegular]"
                  value={date.toLocaleString()}
                />
              </Pressable>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  is24Hour
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View className="flex-row gap-4 justify-end mt-6">
          <Pressable
            className="bg-orange-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => {
              setVisibleEditModal(false);
            }}
          >
            <Edit size={18} color="#fff" />
            <Text className="text-white font-[RobotoRegular] text-base font-bold">
              Update
            </Text>
          </Pressable>

          <Pressable
            className="bg-red-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => setVisibleEditModal(false)}
          >
            <CircleX size={18} color="#fff" />
            <Text className="text-white font-[RobotoRegular] text-base font-bold">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileUpdateModal;
