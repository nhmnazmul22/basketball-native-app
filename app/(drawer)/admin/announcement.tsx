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

const announcementData = [
  {
    Aid: "ANN001",
    title: "Training Session Reminder",
    message:
      "U15 team training tomorrow at 5:00 PM, Court 2. Bring your own water bottle.",
    team: "U15",
    date: "2025-08-12",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
  {
    Aid: "ANN002",
    title: "Battle Match Announcement",
    message:
      "U12 vs U15 friendly match scheduled for August 20 at 4:00 PM, Main Court.",
    team: "All Teams",
    date: "2025-08-10",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
  {
    Aid: "ANN003",
    title: "Payment Reminder",
    message:
      "August membership fee is due by August 15. Please pay via the app or to your coach.",
    team: "All Students",
    date: "2025-08-09",
    createdBy: "Coach Liam",
    isPin: false,
    status: "Active",
  },
  {
    Aid: "ANN004",
    title: "Holiday Notice",
    message: "No training on August 25 due to facility maintenance.",
    team: "All Teams",
    date: "2025-08-08",
    createdBy: "Admin",
    isPin: false,
    status: "Archived",
  },
];

const filterData = [
  { id: 23543, name: "active" },
  { id: 23343, name: "archived" },
];

export default function AnnouncementPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("active");
  const [visibleModal, setVisibleModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.announcements
  );

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAnnouncement());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  const filteredAnnouncement = items?.data.filter((item) => {
    if (filterType) {
      return item.status.toLowerCase() === filterType.toLowerCase();
    } else {
      return item.status.toLowerCase() === "active";
    }
  });

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
            {filteredAnnouncement &&
              filteredAnnouncement.map((item, index) => (
                <AnnounceMentItem key={item._id} item={item} />
              ))}
          </View>
        </View>
      </ScrollView>
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
        onRequestClose={() => {
          setVisibleModal(!visibleModal);
        }}
      >
        <NewAnnouncement setVisibleModal={setVisibleModal} />
      </Modal>
    </>
  );
}
