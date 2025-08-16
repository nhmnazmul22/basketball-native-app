import ProfileUpdateModal from "@/components/ProfielUpdate";
import { LogOut, Notebook, Pencil } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";

const avatar = require("@/assets/images/avater.jpg");
const ProfileScreen = () => {
  const [visibleEditModal, setVisibleEditModal] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="items-center bg-orange-600 pb-6 pt-12 rounded-b-3xl">
        <View className="relative">
          <Image
            source={avatar}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <Pressable className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow">
            <Pencil size={16} color="white" />
          </Pressable>
        </View>
        <Text className="text-xl font-bold text-white mt-4 font-[RobotoRegular]">
          Nazmul Hasan
        </Text>
        <Text className="text-sm text-blue-100 font-[RobotoRegular]">
          nazmul@example.com
        </Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around py-6 border-b border-slate-200 bg-white">
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-900 font-[RobotoRegular]">
            120
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Posts
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-green-600 font-[RobotoRegular]">
            80%
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Attendance
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-orange-600 font-[RobotoRegular]">
            50 Days
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Streak
          </Text>
        </View>
      </View>

      {/* Actions / Settings */}
      <View className="p-4">
        <Pressable
          className="flex-row items-center justify-start gap-3 p-4 mb-3 bg-slate-100 rounded-2xl"
          onPress={() => setVisibleEditModal(true)}
        >
          <Pencil size={16} color="#334155" />{" "}
          <Text className="text-slate-700 font-medium font-[RobotoRegular]">
            Edit Profile
          </Text>
        </Pressable>
        {/* <Pressable className="flex-row items-center justify-start gap-3 p-4 mb-3 bg-slate-100 rounded-2xl">
          <Notebook size={16} color="#334155" />
          <Text className="text-slate-700 font-medium font-[RobotoRegular]">
            Privacy
          </Text>
        </Pressable> */}
        <Pressable className="flex-row items-center justify-start gap-3 p-4 mb-3 bg-slate-100 rounded-2xl">
          <LogOut size={16} color="#dc2626" />
          <Text className="text-red-600 font-medium font-[RobotoRegular]">
            Logout
          </Text>
        </Pressable>
      </View>

      {/* Edit profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleEditModal}
        onRequestClose={() => {
          setVisibleEditModal(!visibleEditModal);
        }}
      >
        <ProfileUpdateModal
          item={null}
          setVisibleEditModal={setVisibleEditModal}
        />
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
