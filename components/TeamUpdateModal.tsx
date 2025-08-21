import { teamStatus } from "@/constants";
import TeamApi from "@/lib/apis/teamApi";
import { generateFileName } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import { Team } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { CircleX, Save } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { Input, TextArea } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";

interface Props {
  item: Team;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const profilePicture = require("@/assets/images/profile-picture.jpg");

const TeamDateUpdateModal = ({ item, setVisibleModal }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleUpdateTeam = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);
      if (photo) {
        formData.append("image", {
          uri: photo.uri,
          name: generateFileName(photo.fileName) || `team-${Date.now()}.jpg`,
          type: photo.mimeType || "image/jpeg",
        } as any);
      }

      const response = await TeamApi.updateTeam(item._id, formData);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        setVisibleModal(false);
        dispatch(fetchTeams());
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(item.name);
    setDescription(item.description);
    setStatus(item.status);
    setPhoto({ uri: item.logo });
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#000000d2]">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Update Team Data
        </Text>
        <Text className="font-[RobotoRegular] text-gray-600 text-center text-lg font-medium">
          ID: {item._id}
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            <View className="flex-col gap-3 p-2 w-40">
              <Image
                source={(photo && { uri: photo.uri }) || profilePicture}
                className="w-40 h-40 object-cover rounded-lg border border-slate-200"
              />
              <Pressable
                className="bg-orange-600 px-4 py-2 rounded-md"
                onPress={() => pickImage()}
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
            <View className="flex-col gap-1">
              <Text className="text-lg  font-[RobotoRegular]">Status:</Text>
              <SimpleSelectOption
                data={teamStatus}
                label="Choose the status"
                value={status}
                setValue={setStatus}
              />
            </View>
          </View>
        </View>
        <View className="flex-row gap-5 justify-end items-center">
          <Pressable
            className="bg-orange-600 py-2 px-3 rounded-lg mt-5 flex-row gap-2 items-center justify-center "
            onPress={() => handleUpdateTeam()}
          >
            {loading && <ActivityIndicator size="small" color="white" />}
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
  );
};

export default TeamDateUpdateModal;
