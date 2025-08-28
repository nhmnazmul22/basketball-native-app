import AnnounceMentItem from "@/components/AnnounceMentItem";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import { fetchDashboardSummary } from "@/store/DashboardSlice";
import { Redirect, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const { session } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items: reports } = useSelector(
    (state: RootState) => state.dashboardSummary
  );
  const { items: announcements } = useSelector(
    (state: RootState) => state.announcements
  );

  // Redirect checks
  if (!session) {
    return <Redirect href="/login" />;
  }
  if (session?.role === "murid") {
    return <Redirect href="/" />;
  }

  // Page Refresh Function
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await dispatch(fetchAnnouncement());
      await dispatch(fetchDashboardSummary());
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 bg-slate-50 px-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: "100%", paddingBottom: 60 }}
    >
      {session?.role === "admin" && (
        <View className="flex-row flex-wrap gap-4 mt-10">
          <View className="bg-orange-600 flex-1 min-w-[150px] p-4 rounded-lg">
            <Text className="text-lg text-white font-[RobotoRegular]">
              Total siswa
            </Text>
            <Text className="text-3xl text-white font-[BebasNeue]">
              {reports?.data?.summary?.totalStudent ?? 0}
            </Text>
          </View>
          <View className="bg-indigo-600 flex-1 min-w-[150px] p-4 rounded-lg">
            <Text className="text-lg text-white font-[RobotoRegular]">
              Pelatih total
            </Text>
            <Text className="text-3xl text-white font-[BebasNeue]">
              {reports?.data?.summary?.totalCoach ?? 0}
            </Text>
          </View>
          <View className="bg-amber-500 flex-1 min-w-[150px] p-4 rounded-lg">
            <Text className="text-lg text-white font-[RobotoRegular]">
              Pembayaran tertunda
            </Text>
            <Text className="text-3xl text-white font-[BebasNeue]">
              {formatCurrency(reports?.data?.summary?.paymentPending ?? 0)}
            </Text>
          </View>
          <View className="bg-green-600 flex-1 min-w-[150px] p-4 rounded-lg">
            <Text className="text-lg text-white font-[RobotoRegular]">
              Pendapatan bersih
            </Text>
            <Text className="text-3xl text-white font-[BebasNeue]">
              {formatCurrency(reports?.data?.summary?.netIncome ?? 0)}
            </Text>
          </View>
        </View>
      )}

      <View className="flex-row gap-3 items-center justify-between my-10">
        <Pressable className="flex-row gap-1 bg-orange-600 p-2 rounded-lg">
          <Plus size={20} color="#ffffff" />
          <Text className="text-base font-[RobotoRegular] text-white">
            New Post
          </Text>
        </Pressable>
        <Pressable
          className="flex-row gap-1 bg-green-600 p-2 rounded-lg"
          onPress={() => router.push("/admin/createAttendance")}
        >
          <Plus size={20} color="#ffffff" />
          <Text className="text-base font-[RobotoRegular] text-white">
            New Attendance
          </Text>
        </Pressable>
        {session?.role === "admin" && (
          <Pressable
            className="flex-row gap-1 bg-indigo-600 p-2 rounded-lg"
            onPress={() => router.push("/admin/createUsers")}
          >
            <Plus size={20} color="#ffffff" />
            <Text className="text-base font-[RobotoRegular] text-white">
              Add User
            </Text>
          </Pressable>
        )}
      </View>

      {session?.role === "admin" && (
        <View>
          <Text className="text-2xl font-[BebasNeue] mb-3 tracking-wider">
            Attendance Overview
          </Text>
          <View className="bg-white rounded-lg p-5 border border-slate-200 items-center">
            <Text className="text-5xl font-[BebasNeue] text-green-600">
              {Math.round(reports?.data?.attendanceReport?.averageAttendance ?? 0)}%
            </Text>
            <Text className="text-gray-500 font-[RobotoRegular] mt-1">
              Daily Report
            </Text>
            <View className="flex-row justify-between w-full mt-5">
              <View className="items-center flex-1">
                <Text className="text-lg font-bold font-[RobotoRegular]">
                  {Math.round(reports?.data?.attendanceReport?.totalPresent ?? 0)}
                </Text>
                <Text className="text-gray-500 font-[RobotoRegular] ">
                  Present
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-lg font-bold font-[RobotoRegular]">
                  {Math.round(reports?.data?.attendanceReport?.totalAbsent ?? 0)}
                </Text>
                <Text className="text-gray-500 font-[RobotoRegular] ">
                  Absent
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-lg font-bold font-[RobotoRegular]">
                  {Math.round(reports?.data?.attendanceReport?.late ?? 0)}
                </Text>
                <Text className="text-gray-500 font-[RobotoRegular] ">
                  Late
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View className="mt-5">
        <Text className="text-2xl font-[BebasNeue] mb-3 tracking-wider">
          Latest Announcement
        </Text>
        <View className="flex-col gap-5 mt-5">
          {!announcements?.data || announcements.data.length === 0 ? (
            <Text className="text-lg font-[RobotoRegular] text-gray-500 text-center">
              No announcements found.
            </Text>
          ) : (
            announcements.data.map((item, index) => {
              if (index === 0) {
                return <AnnounceMentItem key={item._id} item={item} />;
              } else if (index < 6 && session?.role !== "admin") {
                return <AnnounceMentItem key={item._id} item={item} />;
              }
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}