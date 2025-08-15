import ChatScreen from "@/components/ChatScreen";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

// Dummy data
const users = [
  { id: 1, name: "Coach Rahim", role: "Coach" },
  { id: 2, name: "Student A", role: "Student" },
  { id: 3, name: "Student B", role: "Student" },
];

const CommunityTabs = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const renderPosts = () => (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-3">Community Posts</Text>
      <View className="bg-white rounded-xl shadow p-4 mb-4">
        <Text className="font-bold">Student A</Text>
        <Text className="text-xs text-slate-500">2h ago</Text>
        <Text className="mt-2">Scored 95% in Math 🎉</Text>
        <View className="flex-row mt-3 gap-5">
          <Pressable>
            <Text className="text-blue-600">Like</Text>
          </Pressable>
          <Pressable>
            <Text className="text-blue-600">Comment</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );

  const renderFriends = () => (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-3">Friends</Text>
      {users.map((user) => (
        <View
          key={user.id}
          className="flex-row items-center justify-between bg-white rounded-lg p-3 shadow mb-2"
        >
          <View>
            <Text className="font-bold">{user.name}</Text>
            <Text className="text-sm text-slate-500">{user.role}</Text>
          </View>
          <Pressable className="bg-blue-600 px-3 py-1 rounded-lg">
            <Text className="text-white font-bold">Add Friend</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View className="flex-1 bg-slate-100">
      {/* Tabs */}
      <View className="flex-row justify-around bg-white border-b border-slate-200">
        {["Posts", "Messages", "Friends"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="p-4"
          >
            <Text
              className={`font-bold ${activeTab === tab ? "text-blue-600" : "text-slate-600"}`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === "Posts" && renderPosts()}
      {activeTab === "Messages" && <ChatScreen />}
      {activeTab === "Friends" && renderFriends()}
    </View>
  );
};

export default CommunityTabs;
