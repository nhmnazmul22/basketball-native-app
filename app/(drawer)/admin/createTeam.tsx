import SimpleSelectOption from "@/components/SimpleSelectOption";
import { teamStatus } from "@/constants";
import TeamApi from "@/lib/apis/teamApi";
import { generateFileName } from "@/lib/utils";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Input, TextArea } from "tamagui";

const profilePicture = require("@/assets/images/profile-picture.jpg");
const width = Dimensions.get("window").width;

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("active");
    setPhoto(null);
  };

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

  const handleCreateTeam = async () => {
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
      const response = await TeamApi.createTeam(formData);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        resetForm();
        router.push("/admin/team-management");
      } else {
        Toast.show({
          type: "error",
          text1: response.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 p-5 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 80,
          }}
        >
          <View style={{ width: width * 0.9 }} className="w-full mx-auto">
            <View className="flex-col w-full gap-3 mt-5">
              <View className="flex-col gap-3 p-2 w-40">
                <Image
                  source={photo !== null ? { uri: photo.uri } : profilePicture}
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
              <View className="mt-5">
                <Pressable
                  className="bg-orange-600 px-2 py-3 rounded-lg"
                  onPress={handleCreateTeam}
                >
                  {loading && <ActivityIndicator size={24} color="white" />}
                  {!loading && (
                    <Text className="text-lg font-[RobotoRegular] text-white text-center">
                      Create Team
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateTeam;
