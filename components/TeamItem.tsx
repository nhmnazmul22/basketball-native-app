import { shortText } from "@/lib/utils";
import { Eye } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import TeamDataModal from "./TeamDataModal";
import TeamDateUpdateModal from "./TeamUpdateModal";

interface Props {
  item: any;
}

const TeamItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  return (
    <View className="flex-row gap-5 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.teamId}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.name}
      </Text>
      <Text className="w-60 text-md text-left font-[RobotoRegular]">
        {shortText(item.description, 120)}
      </Text>
      <View className="w-28 flex-row justify-center items-start gap-3">
        <Pressable
          className="bg-orange-500 px-2 py-2 rounded"
          onPress={() => setVisibleModal(true)}
        >
          <Eye size={22} color="#ffffff" />
        </Pressable>
      </View>

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          setVisibleModal(!visibleModal);
        }}
      >
        <TeamDataModal
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
        onRequestClose={() => {
          setVisibleEditModal(!visibleEditModal);
        }}
      >
        <TeamDateUpdateModal
          item={item}
          setVisibleModal={setVisibleEditModal}
        />
      </Modal>
    </View>
  );
};

export default TeamItem;
