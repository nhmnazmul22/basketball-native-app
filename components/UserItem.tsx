import { CircleCheck, CircleX, Eye } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import UserDateModalContent from "./UserDateModalContent";
import UserDateUpdateModal from "./UserDateUpdateModal";

interface Props {
  item: any;
}

const UserItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);

  return (
    <View className="flex-row gap-5 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.userId}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.name}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.dob}
      </Text>
      <Text className="w-20 text-md capitalize text-center font-[RobotoRegular]">
        {item.team}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item.role}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.faceIdRegistered ? (
          <CircleCheck color="green" size={24} />
        ) : (
          <CircleX color="red" size={24} />
        )}
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
        <UserDateModalContent
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
        <UserDateUpdateModal
          item={item}
          setVisibleModal={setVisibleEditModal}
        />
      </Modal>
    </View>
  );
};

export default UserItem;
