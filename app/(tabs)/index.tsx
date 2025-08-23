import AnnouncementSlider from "@/components/AnnouncementSlider";
import { useAuth } from "@/context/AuthContext";
import { firstWordUpper, formatCurrency, formateDate } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchAttendance } from "@/store/AttendanceSlice";
import { fetchTransactions } from "@/store/TransactionSlice";
import { Attendance } from "@/types";
import { Link, Redirect } from "expo-router";
import { CreditCard, Megaphone } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

export default function Home() {
  const { session } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState<Attendance[] | null>(
    null
  );
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.attendances);
  const { items: payments } = useSelector(
    (state: RootState) => state.transactions
  );

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (session.role !== "murid") {
    return <Redirect href="/admin/dashboard" />;
  }

  useEffect(() => {
    dispatch(fetchAttendance());
    dispatch(fetchTransactions());
  }, []);

  useEffect(() => {
    if (items?.data && session) {
      const myAttendances = items.data.filter(
        (attend) => attend.studentId === session.user_id
      );
      const attendance = items.data.filter((attend) => {
        if (attend.createdAt) {
          const date = new Date(attend.createdAt);
          return date >= start && date <= end;
        }
      });

      setAttendances(myAttendances);
      if (attendance.length > 0) {
        setTodayAttendance(attendance);
      }
    }
  }, [items, session.user_id]);

  const presentAttendance = attendances.filter(
    (attend) => attend.status === "hadiah"
  ).length;

  const absentAttendance = attendances.filter(
    (attend) => attend.status === "absen"
  ).length;

  const lateAttendance = attendances.filter(
    (attend) => attend.status === "terlambat"
  ).length;

  const myLastPayment = payments?.data?.filter(
    (pay) => pay.studentId === session.user_id
  );

  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <View className="flex-1 flex-col gap-3">
        <View className="bg-white rounded-xl shadow-md p-4 mb-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-slate-800">Kehadiran</Text>
            <Pressable>
              <Link
                href="/attendance"
                className="text-sm font-semibold text-orange-600"
              >
                Lihat semua
              </Link>
            </Pressable>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base text-slate-600">Hari ini</Text>
            <Text className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
              {todayAttendance !== null
                ? todayAttendance[0].status
                : "Tidak ditemukan"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 mx-1 bg-green-50 rounded-lg p-3 items-center">
              <Text className="text-lg font-bold text-green-700">
                {presentAttendance}
              </Text>
              <Text className="text-xs text-slate-600">Hadiah</Text>
            </View>
            <View className="flex-1 mx-1 bg-red-50 rounded-lg p-3 items-center">
              <Text className="text-lg font-bold text-red-700">
                {absentAttendance}
              </Text>
              <Text className="text-xs text-slate-600">Absen</Text>
            </View>
            <View className="flex-1 mx-1 bg-yellow-50 rounded-lg p-3 items-center">
              <Text className="text-lg font-bold text-yellow-700">
                {lateAttendance}
              </Text>
              <Text className="text-xs text-slate-600">Terlambat</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 200 }} className="flex-col gap-2">
          <View className="flex-row gap-2 items-center">
            <Megaphone size={20} />
            <Text className="text-lg font-bold font-[RobotoRegular]">
              Pengumuman terbaru,
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
              Status pembayaran
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
                {myLastPayment?.[0]
                  ? firstWordUpper(myLastPayment?.[0].status)
                  : "-"}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-bold font-[RobotoRegular]">
                Jumlah
              </Text>
              <Text className="text-base font-[RobotoRegular] text-gray-700">
                {myLastPayment?.[0]
                  ? formatCurrency(myLastPayment?.[0].amount)
                  : "-"}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base font-bold font-[RobotoRegular]">
                Tanggal yang dibuat
              </Text>
              <Text className="text-base font-[RobotoRegular] text-gray-700">
                {myLastPayment?.[0]
                  ? formateDate(myLastPayment?.[0].createdAt)
                  : "-"}
              </Text>
            </View>

            <View className="flex-row justify-between gap-3">
              <Pressable className="flex-1 bg-orange-600 py-3 rounded-xl items-center">
                <Link
                  href="/createPayment"
                  className="text-base font-bold font-[RobotoRegular] text-white"
                >
                  Pay Now
                </Link>
              </Pressable>

              <Pressable className="flex-1 border border-orange-600 py-3 rounded-xl items-center">
                <Link
                  href="/payment"
                  className="text-base font-bold font-[RobotoRegular] text-orange-600"
                >
                  History
                </Link>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
