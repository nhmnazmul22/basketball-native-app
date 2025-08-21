import TeamList from "@/components/TeamList";
import { AppDispatch } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

export default function TeamManagementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchTeams());
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
      <View className=" mt-3">
        <View className="flex-row justify-between items-center ">
          <Text className=" font-[BebasNeue] text-2xl tracking-wider">
            Team Management,
          </Text>
          <Pressable
            className="bg-orange-500 px-4 py-2 rounded-lg flex-row gap-2 items-center"
            onPress={() => router.push("/admin/createTeam")}
          >
            <Plus size={18} color="#ffffff" />
            <Text className="text-base text-white ">Add Team</Text>
          </Pressable>
        </View>
        <TeamList />
      </View>
    </ScrollView>
  );
}
