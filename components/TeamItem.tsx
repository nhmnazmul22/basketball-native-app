import TeamApi from "@/lib/apis/teamApi";
import { firstWordUpper, shortText } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import { Team } from "@/types";
import { Eye, Trash } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import TeamDataModal from "./TeamDataModal";
import TeamDateUpdateModal from "./TeamUpdateModal";

interface Props {
  item: Team;
}

const TeamItem = ({ item }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!item._id) {
        return;
      }
      const response = await TeamApi.deleteTeam(item._id);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Team deleted successfully",
        });
        dispatch(fetchTeams());
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

  return (
    <View className="flex-row gap-5 border-b border-gray-200 px-2 py-4 items-center">
      <View className="w-20 text-md text-center font-[RobotoRegular]">
        <Image
          source={{ uri: item.logo }}
          className="w-[40px] h-[40px] rounded-full object-cover mx-auto"
        />
      </View>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {shortText(item._id, 10)}
      </Text>
      <Text className="w-28 text-md text-center font-[RobotoRegular]">
        {item.name}
      </Text>
      <Text className="w-60 text-md text-center font-[RobotoRegular]">
        {shortText(item.description, 120)}
      </Text>
      <Text className="w-20 text-md text-center font-[RobotoRegular]">
        {firstWordUpper(item.status)}
      </Text>
      <View className="w-28 flex-row justify-center items-start gap-3">
        <Pressable
          className="bg-orange-500 px-2 py-2 rounded"
          onPress={() => setVisibleModal(true)}
        >
          <Eye size={20} color="#ffffff" />
        </Pressable>
        <Pressable
          className="bg-red-600 px-2 py-2 rounded"
          onPress={() => handleDelete()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Trash size={20} color="#ffffff" />
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
