import { AppDispatch, RootState } from "@/store";
import { fetchAttendance } from "@/store/AttendanceSlice";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "tamagui";
import AttendanceItem from "./AttendanceItem";

const attendanceData = [
  {
    date: "2025-08-07",
    name: "Ahmad Yusuf",
    team: "U12",
    time: "08:12",
    status: "present",
    locationVerified: true,
    faceMatch: 0.92,
  },
  {
    date: "2025-08-07",
    name: "Budi Santoso",
    team: "U15",
    time: null,
    status: "absent",
    locationVerified: false,
    faceMatch: null,
  },
  {
    date: "2025-08-07",
    name: "Budi Santoso",
    team: "U15",
    time: null,
    status: "absent",
    locationVerified: false,
    faceMatch: null,
  },
];

const AttendanceList = () => {
  const [searchParams, setSearchParams] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.attendances
  );

  useEffect(() => {
    dispatch(fetchAttendance());
  }, []);

  const filteredAttendance = items?.data.filter((attendance) => {
    const search = searchParams.toLowerCase();

    if (searchParams) {
      return (
        //@ts-ignore
        attendance._id.toLowerCase().includes(search) ||
        attendance.studentName.toLowerCase().includes(search) ||
        attendance.teamName.toLowerCase().includes(search) ||
        attendance.status?.toLowerCase().includes(search)
      );
    } else {
      return true;
    }
  });

  return (
    <>
      <View className="my-5 flex-col gap-2 items-center justify-between">
        <View className="w-full">
          <Input
            placeholder="Nama atau tim atau status"
            value={searchParams}
            onChangeText={setSearchParams}
          />
        </View>
      </View>
      <ScrollView horizontal className="pb-4">
        <View>
          {/* Table Header */}
          <View className="flex-row gap-2 bg-gray-100 p-2 rounded-t">
            <Text className="w-36 font-bold text-lg text-center font-[RobotoRegular]">
              Nama
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Tim
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Waktu
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Status
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Gps
            </Text>
            <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
              Match wajah
            </Text>
            <Text className="w-24 font-bold text-lg text-center font-[RobotoRegular]">
              Tindakan
            </Text>
          </View>
          {/* Table Rows */}
          <FlatList
            data={filteredAttendance}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <AttendanceItem item={item} />}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AttendanceList;
