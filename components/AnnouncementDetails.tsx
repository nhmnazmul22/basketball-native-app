import { useAuth } from "@/context/AuthContext";
import { firstWordUpper, formateDateTime } from "@/lib/utils";
import { Announcement } from "@/types";
import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Props {
  item: Announcement;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}

const AnnouncementDetails = ({
  item,
  setVisibleModal,
  setVisibleEditModal,
}: Props) => {
  const { session } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-[#00000070] px-4">
      <View className="w-full max-h-[85%] bg-white p-6 rounded-2xl shadow-lg">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
            Detail Pengumuman
          </Text>
          <Text className="font-[RobotoRegular] text-center text-base text-slate-500 mb-4">
            ID: {item._id}
          </Text>

          {/* Main content */}
          <View className="space-y-2">
            <Text className="text-xl font-[RobotoRegular] font-bold text-blue-900">
              {item.title}
            </Text>
            <Text className="text-base font-[RobotoRegular] text-slate-700 leading-6">
              {item.message}
            </Text>
          </View>

          {/* Info section */}
          <View className="mt-6">
            <Text className="text-lg font-bold font-[RobotoRegular] border-b pb-1 mb-3 text-slate-800">
              Informasi lainnya
            </Text>

            {[
              { label: "Tim", value: item.teamDetails.name },
              { label: "Tanggal", value: formateDateTime(item.date) },
              { label: "Status", value: firstWordUpper(item.status) },
            ].map((info, idx) => (
              <View key={idx} className="flex-row mb-2">
                <Text className="w-28 text-base font-bold font-[RobotoRegular] text-slate-700">
                  {info.label}
                </Text>
                <Text className="text-base font-[RobotoRegular] text-slate-600">
                  {info.value}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Action buttons */}
        <View className="flex-row gap-4 justify-end mt-6">
          {session.role !== "murid" && (
            <Pressable
              className="bg-orange-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
              onPress={() => {
                setVisibleModal(false);
                setVisibleEditModal(true);
              }}
            >
              <Edit size={18} color="#ffffff" />
              <Text className="text-white font-[RobotoRegular] text-base font-bold">
                Edit
              </Text>
            </Pressable>
          )}

          <Pressable
            className="bg-red-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => setVisibleModal(false)}
          >
            <CircleX size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular] text-base font-bold">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementDetails;
