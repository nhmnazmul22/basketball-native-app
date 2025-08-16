import React, { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Input, Label } from "tamagui";

const avater = require("@/assets/images/avater.jpg");
export default function AdminSettingPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("admin@example.com");
  const [role] = useState("Admin");
  const [phone, setPhone] = useState("0123456789");

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
      className="flex-1 bg-gray-50 p-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Profile Section */}
      <View className="items-center mb-6">
        <Image source={avater} className="w-24 h-24 rounded-full mb-3" />
        <Pressable className="bg-orange-600 px-4 py-1 rounded-md">
          <Text className="text-white font-bold">Change Photo</Text>
        </Pressable>
      </View>

      {/* Form Fields */}
      <View className="flex-col gap-4">
        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Full Name
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Email
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Phone
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Role
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            value={role}
            readOnly
          />
        </View>

        {/* Change Password */}
        <View className="flex-col mt-6 gap-2">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Change Password
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Current password"
            secureTextEntry
          />
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="New password"
            secureTextEntry
          />
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Confirm new password"
            secureTextEntry
          />
        </View>

        {/* Update Button */}
        <Pressable className="bg-orange-600 mt-6 py-3 rounded-xl items-center">
          <Text className="text-white font-bold text-base font-[RobotoRegular]">
            Update Profile
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
