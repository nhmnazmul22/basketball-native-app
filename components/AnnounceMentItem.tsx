import { formateDateTime, shortText } from "@/lib/utils";
import { Announcement } from "@/types";
import { Calendar, Pin } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import AnnouncementDetails from "./AnnouncementDetails";
import AnnouncementEditModal from "./AnnouncementEditModal";

interface Props {
  item: Announcement;
}

const AnnounceMentItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);

  return (
    <View className="mb-4">
      <View className="bg-white p-5 rounded-xl shadow-lg elevation-md">
        {/* Pin Badge */}
        {item?.isPinned && (
          <View className="-rotate-45 w-7 h-7 absolute left-[-8px] top-[-8px] bg-orange-600 justify-center items-center rounded-full shadow-md">
            <Pin size={16} color="white" />
          </View>
        )}

        {/* Title */}
        <Text className="text-xl text-blue-900 font-bold font-[RobotoRegular] mb-2">
          {item?.title ?? "Untitled"}
        </Text>

        {/* Message Preview */}
        <Text className="text-base text-slate-700 font-[RobotoRegular] leading-5">
          {shortText(item?.message ?? "", 140)}
        </Text>

        {/* Info Section */}
        <View className="mt-4 flex-row justify-between flex-wrap">
          <View className="flex-row gap-2 items-center mb-2">
            <Calendar size={20} />
            <Text className="text-base text-slate-800">
              {item?.date ? formateDateTime(item.date) : "No date"}
            </Text>
          </View>

          <Pressable
            onPress={() => setVisibleModal(true)}
            className="px-3 py-1 bg-blue-100 rounded-md"
          >
            <Text className="text-sm font-semibold text-blue-700">
              View Details
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <AnnouncementDetails
          item={item}
          setVisibleModal={setVisibleModal}
          setVisibleEditModal={setVisibleEditModal}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleEditModal}
        onRequestClose={() => setVisibleEditModal(false)}
      >
        <AnnouncementEditModal
          item={item}
          setVisibleEditModal={setVisibleEditModal}
        />
      </Modal>
    </View>
  );
};

export default AnnounceMentItem;