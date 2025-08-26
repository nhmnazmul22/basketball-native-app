import { AppDispatch, RootState } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TableError from "./TableError";
import TableLoading from "./TableLoading";
import TeamItem from "./TeamItem";

const TeamList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <View className="mt-10">
      <ScrollView horizontal className="pb-4">
        <View>
          {/* Table Header */}
          <View className="flex-row gap-5 bg-gray-100 p-2 rounded-t">
            <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
              logo
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Sains
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Nama
            </Text>
            <Text className="w-60 font-bold text-lg text-center font-[RobotoRegular]">
              Keterangan
            </Text>
            <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
              status
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Tindakann
            </Text>
          </View>
          {/* Table Rows */}
          <FlatList
            data={items?.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <TeamItem item={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamList;
