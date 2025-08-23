import AnnounceMentItem from "@/components/AnnounceMentItem";
import SimpleSelectOption from "@/components/SimpleSelectOption";
import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "tamagui";

const filterData = [
  { id: 23543, name: "aktif" },
  { id: 23343, name: "arsip" },
];

export default function AnnouncementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("aktif");
  const [visibleModal, setVisibleModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.announcements
  );

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, []);

  const filteredAnnouncement = items?.data.filter((item) => {
    if (filterType) {
      return item.status.toLowerCase() === filterType.toLowerCase();
    } else {
      return item.status.toLowerCase() === "aktif";
    }
  });

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
        <View className="flex-col gap-5 mt-5">
          {filteredAnnouncement?.map((item, index) => (
            <AnnounceMentItem key={item._id} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
