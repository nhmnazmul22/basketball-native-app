import { roles, userStatus } from "@/constants";
import UserApi from "@/lib/apis/userApi";
import { generateFileName } from "@/lib/utils";
import { User } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Input, Label } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";
import TakePicture from "./TakePicture";

interface Props {
  item: User;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const teamData = [
  { id: 18254, name: "U12" },
  { id: 55288, name: "U15" },
  { id: 98566, name: "U30" },
  { id: 86868, name: "U30" },
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
  const [photoUri, setPhotoUri] = useState<string>("");
  const [capturePic, setCapturePic] = useState<Boolean>(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      console.log("Updating user:", item._id);

      if (!item._id) {
        Toast.show({
          type: "error",
          text1: "User ID is missing",
          text2: "Please try again later.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("dob", date.toISOString());
      formData.append("team", team);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("status", status);
      formData.append("image", {
        uri: photo.uri,
        name: generateFileName(photo.uri) || "upload.jpg",
        type: "image/jpeg",
      } as any);

      const response = await UserApi.updateUser(item._id, formData);

      if (response?.success) {
        setVisibleModal(false);
        Toast.show({
          type: "success",
          text1: "User updated successfully",
        });
      } else {
        setVisibleModal(false);
        Toast.show({
          type: "error",
          text1: "Update failed",
          text2: response?.message || "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(item.fullName || "");
    setDate((item.dob && new Date(item.dob)) || new Date());
    setTeam(item.team);
    setRole(item.role || "");
    setEmail(item.email || "");
    setPhone(item.phone || "");
    setStatus(item.status || "");
    setPhotoUri(item.profilePicture || "");
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
            ID: {item._id}
          </Text>
          <View className="mt-5 flex flex-col gap-2">
            <View className="flex-col gap-2">
              <View className="w-40 rounded-lg p-2 mb-3">
                <Image
                  source={
                    photo !== null
                      ? { uri: photo.uri }
                      : photoUri
                        ? { uri: photoUri }
                        : profilePicture
                  }
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
                  data={roles}
                  label="Choose the role"
                  value={role}
                  setValue={setRole}
                />
              </View>
              <View className="flex-col">
                <Label
                  unstyled
                  className="text-xl font-bold font-[RobotoRegular]"
                >
                  Status:
                </Label>
                <SimpleSelectOption
                  data={userStatus}
                  label="Choose the status"
                  value={status}
                  setValue={setStatus}
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
              onPress={() => handleUpdateUser()}
            >
              {loading && <ActivityIndicator size="small" color="#ffffff" />}
              {!loading && (
                <>
                  <Save size={18} color="#ffffff" />
                  <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
                    Update
                  </Text>
                </>
              )}
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
