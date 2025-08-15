import { shortText } from "@/lib/utils";
import { Pin } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import AnnouncementDetails from "./AnnouncementDetails";
import AnnouncementEditModal from "./AnnouncementEditModal";

interface Props {
  item: any;
}

const AnnounceMentItem = ({ item }: Props) => {
  const [visibleModal, seVisibleModal] = useState(false);
  const [visibleEditModal, seVisibleEditModal] = useState(false);
  return (
    <View key={item.Aid}>
      <View className="">
        <View className="bg-slate-200 p-5 rounded-lg shadow-md elevation-md">
          {item.isPin && (
            <View className="-rotate-45 w-[25px] h-[25px] absolute left-[-6px] top-[-6px] bg-orange-600 justify-center items-center rounded-full">
              <Text>
                <Pin size={16} color="white" />
              </Text>
            </View>
          )}
          <Text className="text-xl text-blue-900 font-bold font-[RobotoRegular] flex-row gap-2 items-center">
            {item.title}
          </Text>

          <Text className="text-base mt-2 font-thin font-[RobotoRegular]">
            {shortText(item.message, 140)}
          </Text>
          <View className="mt-3 flex-row gap-5 justify-between items-center">
            <Text className="text-base font-[RobotoRegular]">
              <Text className="font-bold">Date:</Text> {item.date}
            </Text>
            <Text className="text-base font-[RobotoRegular]">
              <Text className="font-bold">Create By: </Text>
              {item.createdBy}
            </Text>
            <Pressable onPress={() => seVisibleModal(true)}>
              <Text className="text-base font-semibold font-[RobotoRegular] underline text-blue-800">
                More
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          seVisibleModal(!visibleModal);
        }}
      >
        <AnnouncementDetails
          item={item}
          setVisibleModal={seVisibleModal}
          setVisibleEditModal={seVisibleEditModal}
        />
      </Modal>

      {/* Announcement Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleEditModal}
        onRequestClose={() => {
          seVisibleEditModal(!visibleEditModal);
        }}
      >
        <AnnouncementEditModal
          item={item}
          setVisibleEditModal={seVisibleEditModal}
        />
      </Modal>
    </View>
  );
};

export default AnnounceMentItem;
