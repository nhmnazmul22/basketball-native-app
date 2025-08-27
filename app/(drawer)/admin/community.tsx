import ChatScreen from "@/components/ChatScreen";
import CreateGroup from "@/components/CreateGroup";
import GroupScreen from "@/components/GroupScreen";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const renderPosts = () => (
    <ScrollView className="p-4">
      <View className="flex-row gap-3 justify-between items-center mb-5">
        <Text className="text-xl font-bold mb-3 font-[RobotoRegular]">
          Community Posts
        </Text>
        <Pressable className="bg-orange-600 flex-row gap-2 justify-center items-center py-2 px-4 rounded-lg">
          <Plus size={20} color="#ffffff" />
          <Text className="text-white font-[RobotoRegular]">Add Post</Text>
        </Pressable>
      </View>
      <View className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-4">
        <Text className="font-bold text-base font-[RobotoRegular]">
          Student A
        </Text>
        <Text className="text-xs text-slate-500 font-[RobotoRegular]">
          2h ago
        </Text>
        <Text className="mt-2 font-[RobotoRegular]">Scored 95% in Math 🎉</Text>
      </View>
    </ScrollView>
  );

const CommunityTabs = () => {
  const [activeTab, setActiveTab] = useState("Groups");

  return (
    <View className="flex-1 bg-white">
      {/* Tabs */}
     <View className="flex-row justify-around bg-white border-b border-slate-200">
        {["Posts", "Groups",].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="p-4"
          >
            <Text
              className={`font-bold font-[RobotoRegular] ${activeTab === tab ? "text-blue-600" : "text-slate-600"}`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View> 

      {/* Tab Content */}
      {activeTab === "Posts" && renderPosts()}
      {activeTab === "Messages" && <ChatScreen />}
      {activeTab === "Groups" && <GroupScreen setTab={setActiveTab}/>}
      {activeTab === "Create Group" && <CreateGroup/>}
    </View>
  );
};

export default CommunityTabs;
