import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { useAuth } from "@/context/AuthContext";
import { formateDate, formateDateTime, formatTime } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchAttendance } from "@/store/AttendanceSlice";
import { Attendance } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

const renderLogItem = ({ item }: { item: Attendance }) => (
  <View className="flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3">
    <View>
      <Text className="text-base font-semibold text-slate-800 font-[RobotoRegular]">
        {item.createdAt && formateDate(item.createdAt)}
      </Text>
      <Text className="text-base font-semibold text-slate-800 font-[RobotoRegular]">
        {item.createdAt && formatTime(item.createdAt)}
      </Text>
    </View>
    <View className="items-end">
      <Text
        className={`text-sm font-bold px-3 py-1 rounded-full font-[RobotoRegular] ${
          item.status === "hadiah"
            ? "bg-green-100 text-green-700"
            : item.status === "absen"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {item.status}
      </Text>
    </View>
  </View>
);

const AttendancePage = () => {
  const { session } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState<Attendance[] | null>(
    null
  );
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.attendances
  );

  useEffect(() => {
    dispatch(fetchAttendance());
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

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <View className="flex-1 bg-white p-5">
      {/* Today’s Status */}
      <View className="bg-white rounded-xl shadow-lg p-5 mb-5">
        <Text className="text-lg font-bold text-slate-800 mb-2 font-[RobotoRegular]">
          Kehadiran hari ini
        </Text>
        <Text className="text-2xl font-extrabold text-green-600 font-[RobotoRegular]">
          {todayAttendance !== null
            ? todayAttendance[0].status
            : "Tidak ditemukan"}
        </Text>
        <Text className="text-sm text-slate-500">
          {todayAttendance !== null
            ? todayAttendance[0].createdAt &&
              formateDateTime(todayAttendance[0].createdAt)
            : "-"}
        </Text>
      </View>

      {/* Summary */}
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mx-1 bg-green-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-green-700 font-[RobotoRegular]">
            {presentAttendance}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Present
          </Text>
        </View>
        <View className="flex-1 mx-1 bg-red-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-red-700 font-[RobotoRegular]">
            {absentAttendance}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Absent
          </Text>
        </View>
        <View className="flex-1 mx-1 bg-yellow-100 rounded-lg p-4 items-center">
          <Text className="text-xl font-bold text-yellow-700 font-[RobotoRegular]">
            {lateAttendance}
          </Text>
          <Text className="text-sm text-slate-600 font-[RobotoRegular]">
            Late
          </Text>
        </View>
      </View>

      {/* Recent Logs */}
      <Text className="text-lg font-bold text-slate-800 mb-3 font-[RobotoRegular]">
        Recent Logs
      </Text>
      <FlatList
        data={attendances}
        renderItem={renderLogItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AttendancePage;
