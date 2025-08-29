import AnnounceMentItem from "@/components/AnnounceMentItem";
import NewAnnouncement from "@/components/NewAccouncement";
import SimpleSelectOption from "@/components/SimpleSelectOption";
import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import { Plus } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "tamagui";

const filterData = [
  { id: 23543, name: "aktif" },
  { id: 23343, name: "arsip" },
];

export default function AnnouncementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("aktif"); // ✅ default matches data
  const [visibleModal, setVisibleModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.announcements
  );

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAnnouncement()).finally(() => {
      setRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  const filteredAnnouncement =
    items?.data?.filter((item) =>
      filterType
        ? item.status.toLowerCase() === filterType.toLowerCase()
        : item.status.toLowerCase() === "aktif"
    ) || [];

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <>
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
            {filteredAnnouncement.length > 0 ? (
              filteredAnnouncement.map((item) => (
                <AnnounceMentItem key={item._id} item={item} />
              ))
            ) : (
              <Text className="text-center text-gray-500 mt-10">
                No announcements found
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <View className="absolute bottom-[3%] right-[7%] ">
        <Pressable
          className="bg-orange-600 px-4 py-3 rounded-full flex-row gap-1 items-center "
          onPress={() => setVisibleModal(true)}
        >
          <Plus size={20} color="#ffffff" />
          <Text className="font-[RobotoRegular] text-white">
            New Announcement
          </Text>
        </Pressable>
      </View>

      {/* New Announcement Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <NewAnnouncement setVisibleModal={setVisibleModal} />
      </Modal>
    </>
  );
}