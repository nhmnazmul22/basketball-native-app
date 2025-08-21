import UserApi from "@/lib/apis/userApi";
import { formateDate, shortText } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import { User } from "@/types";
import { CircleCheck, CircleX, Eye, Trash } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import UserDataModalContent from "./UserDataModalContent";
import UserDataUpdateModal from "./UserDataUpdateModal";

interface Props {
  item: User;
}

const UserItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.teams);

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!item._id) {
        return;
      }
      const response = await UserApi.deleteUser(item._id);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "User deleted successfully",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to delete user",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, []);

  const selectedTeam = items?.data.find((team) => team._id === item.teamId);

  return (
    <View className="flex-row gap-5 border-b border-gray-200 px-2 py-4">
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item?._id && shortText(item?._id, 10)}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item?.fullName}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {(item.dob && formateDate(item.dob)) || "N/A"}
      </Text>
      <Text className="w-20 text-md capitalize text-center font-[RobotoRegular]">
        {selectedTeam?.name || "N/A"}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {item?.role[0].toUpperCase() + item?.role.slice(1) || "N/A"}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.faceDescriptor && item.faceDescriptor?.length > 0 ? (
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
        <Pressable
          className="bg-red-600 px-2 py-2 rounded"
          onPress={handleDelete}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Trash size={22} color="#ffffff" />
          )}
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
        <UserDataModalContent
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
        <UserDataUpdateModal
          item={item}
          setVisibleModal={setVisibleEditModal}
        />
      </Modal>
    </View>
  );
};

export default UserItem;
