import AnnouncementSlider from "@/components/AnnouncementSlider";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { CreditCard, Megaphone } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (session.role !== "murid") {
    return <Redirect href="/admin/dashboard" />;
  }

  return (
    <View className="flex-1 p-5 bg-white flex-col gap-3">
      <View className="bg-white rounded-xl shadow-md p-4 mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-slate-800">Attendance</Text>
          <Pressable>
            <Text className="text-sm font-semibold text-orange-600">
              View All
            </Text>
          </Pressable>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-base text-slate-600">Today</Text>
          <Text className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
            Present
          </Text>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1 mx-1 bg-green-50 rounded-lg p-3 items-center">
            <Text className="text-lg font-bold text-green-700">18</Text>
            <Text className="text-xs text-slate-600">Present</Text>
          </View>
          <View className="flex-1 mx-1 bg-red-50 rounded-lg p-3 items-center">
            <Text className="text-lg font-bold text-red-700">2</Text>
            <Text className="text-xs text-slate-600">Absent</Text>
          </View>
          <View className="flex-1 mx-1 bg-yellow-50 rounded-lg p-3 items-center">
            <Text className="text-lg font-bold text-yellow-700">1</Text>
            <Text className="text-xs text-slate-600">Late</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 200 }} className="flex-col gap-2">
        <View className="flex-row gap-2 items-center">
          <Megaphone size={20} />
          <Text className="text-lg font-bold font-[RobotoRegular]">
            Latest's Announcements,
          </Text>
        </View>

        <View>
          <AnnouncementSlider />
        </View>
      </View>
      <View className="flex-col gap-3">
        <View className="flex-row gap-2 items-center">
          <CreditCard size={20} />
          <Text className="text-lg font-bold font-[RobotoRegular]">
            Payment Status
          </Text>
        </View>

        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 5,
          }}
          className="bg-white rounded-2xl p-4"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-bold font-[RobotoRegular]">
              Status
            </Text>
            <Text className="text-base font-[RobotoRegular] text-red-600 font-bold">
              Overdue
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-bold font-[RobotoRegular]">
              Amount
            </Text>
            <Text className="text-base font-[RobotoRegular] text-gray-700">
              Rp 200.000
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold font-[RobotoRegular]">
              Due Date
            </Text>
            <Text className="text-base font-[RobotoRegular] text-gray-700">
              15-08-2025
            </Text>
          </View>

          <View className="flex-row justify-between gap-3">
            <Pressable className="flex-1 bg-orange-600 py-3 rounded-xl items-center">
              <Text className="text-base font-bold font-[RobotoRegular] text-white">
                Pay Now
              </Text>
            </Pressable>

            <Pressable className="flex-1 border border-orange-600 py-3 rounded-xl items-center">
              <Text className="text-base font-bold font-[RobotoRegular] text-orange-600">
                History
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
