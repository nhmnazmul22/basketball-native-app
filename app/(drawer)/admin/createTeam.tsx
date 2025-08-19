import React, { useState } from "react";
import {
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
import { Input, TextArea } from "tamagui";

const profilePicture = require("@/assets/images/profile-picture.jpg");
const width = Dimensions.get("window").width;


const CreateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
              <View className="mt-5">
                <Pressable className="bg-orange-600 px-2 py-3 rounded-lg">
                  {/* <ActivityIndicator size={24} color="white"/> */}
                  <Text className="text-lg font-[RobotoRegular] text-white text-center">
                    Create Team
                  </Text>
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
