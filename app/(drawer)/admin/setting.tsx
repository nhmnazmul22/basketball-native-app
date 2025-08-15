import React, { useCallback, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Input, Label } from "tamagui";

export default function SettingPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 p-5 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 40,
      }}
    >
      <View className="mt-3 flex-col gap-2">
        <View className="flex-col">
          <Label unstyled className="text-xl font-bold font-[RobotoRegular]">
            Full Name:
          </Label>
          <Input
            className="text-lg font-[RobotoRegular]"
            placeholder="Enter full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View className="flex-col">
          <Label unstyled className="text-xl font-bold font-[RobotoRegular]">
            Email:
          </Label>
          <Input
            className="text-lg font-[RobotoRegular]"
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="flex-col">
          <Label unstyled className="text-xl font-bold font-[RobotoRegular]">
            Role:
          </Label>
          <Input
            className="text-lg font-[RobotoRegular]"
            placeholder="Enter Email"
            readOnly
            value="Admin"
          />
        </View>
        <Pressable className="ms-auto mt-5 me-5 bg-orange-600 px-5 py-2 rounded-lg">
          <Text className="text-base text-white font-bold">Update</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
