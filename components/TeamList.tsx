import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import TeamItem from "./TeamItem";
const userData = [
  {
    teamId: "T01",
    name: "U12",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ducimus?",
  },
  {
    teamId: "T02",
    name: "U15",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ducimus?",
  },
  {
    teamId: "T03",
    name: "U30",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ducimus?",
  },
];

const TeamList = () => {
  return (
    <View className="mt-10">
      <ScrollView horizontal className="pb-4">
        <View>
          {/* Table Header */}
          <View className="flex-row gap-5 bg-gray-100 p-2 rounded-t">
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              TeamId
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Name
            </Text>
            <Text className="w-60 font-bold text-lg text-center font-[RobotoRegular]">
              Description
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Actions
            </Text>
          </View>
          {/* Table Rows */}
          <FlatList
            data={userData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <TeamItem item={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamList;
