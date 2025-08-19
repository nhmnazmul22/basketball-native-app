import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Input, Label } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";
import TakePicture from "./TakePicture";

interface Props {
  item: any;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const teamData = [
  { id: 18254, name: "U12" },
  { id: 55288, name: "U15" },
  { id: 98566, name: "U30" },
  { id: 86868, name: "U30" },
];

const roleData = [
  { id: 89845, name: "Student" },
  { id: 54877, name: "Couch" },
  { id: 65825, name: "Admin" },
];

const profilePicture = require("@/assets/images/profile-picture.jpg");
const UserDateUpdateModal = ({ item, setVisibleModal }: Props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState<any>(null);
  const [capturePic, setCapturePic] = useState<Boolean>(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  useEffect(() => {
    setName(item.name || "");
    setDate(new Date(item.dob) || new Date());
    setTeam(item.team);
    setRole(item.role || "");
    setEmail(item.email || "");
    setPhone(item.phone || "");
  }, []);

  if (capturePic && !photo) {
    return <TakePicture photo={photo} setPhoto={setPhoto} />;
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 justify-center items-center bg-[#000000d2] py-16">
        <View className="w-[90%] bg-white p-5 rounded-lg">
          <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
            Update User Data
          </Text>
          <Text className="font-[RobotoRegular] text-gray-600 text-center text-lg font-medium">
            ID: {item.userId}
          </Text>
          <View className="mt-5 flex flex-col gap-2">
            <View className="flex-col gap-2">
              <View className="w-40 rounded-lg p-2 mb-3">
                <Image
                  source={photo !== null ? { uri: photo.uri } : profilePicture}
                  className="w-full h-40 object-cover rounded-lg border border-gray-300 mb-3"
                />
                {photo ? (
                  <Pressable
                    className="bg-orange-600 px-4 py-2 rounded-md"
                    onPress={() => {
                      setCapturePic(true);
                      setPhoto(null);
                    }}
                  >
                    <Text className="text-white font-bold text-center">
                      Retake Photo
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    className="bg-orange-600 px-4 py-2 rounded-md"
                    onPress={() => setCapturePic(true)}
                  >
                    <Text className="text-white font-bold text-center">
                      Add Photo
                    </Text>
                  </Pressable>
                )}
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
                    readOnly
                    className="text-lg font-[RobotoRegular]"
                    placeholder="Enter your name"
                    value={date.toLocaleDateString()}
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
                <SimpleSelectOption
                  data={teamData}
                  label="Choose the team"
                  value={team}
                  setValue={setTeam}
                />
              </View>
              <View className="flex-col">
                <Label
                  unstyled
                  htmlFor="role"
                  className="text-xl font-bold font-[RobotoRegular]"
                >
                  Role:
                </Label>
                <SimpleSelectOption
                  data={roleData}
                  label="Choose the role"
                  value={role}
                  setValue={setRole}
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
    </ScrollView>
  );
};

export default UserDateUpdateModal;
