import AnnounceMentItem from "@/components/AnnounceMentItem";
import SimpleSelectOption from "@/components/SimpleSelectOption";
import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "tamagui";

const filterData = [
  { id: 23543, name: "aktif" },
  { id: 23343, name: "arsip" },
];

export default function AnnouncementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("aktif");
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.announcements
  );

  // Page Refresh Function
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchAnnouncement());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  const filteredAnnouncement = items?.data?.filter((item) =>
    (filterType || "aktif").toLowerCase() === item.status.toLowerCase()
  );

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 p-5 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 100,
      }}
    >
      <View className="mt-3 flex-1">
        {/* Filter Section */}
        <View className="flex-col gap-2 justify-center">
          <Label unstyled className="font-[RobotoRegular]">
            Select Filter Type:
          </Label>
          <SimpleSelectOption
            data={filterData}
            label="Select Filter Type"
            value={filterType}
            setValue={setFilterType}
          />
        </View>

        {/* Announcements List */}
        <View className="flex-col gap-5 mt-5">
          {filteredAnnouncement && filteredAnnouncement.length > 0 ? (
            filteredAnnouncement.map((item) => (
              <AnnounceMentItem
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <Text className="text-center text-slate-500 mt-10">
              No announcements found.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}