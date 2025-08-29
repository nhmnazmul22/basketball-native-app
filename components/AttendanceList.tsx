import { BASE_URL } from "@/config";
import { AppDispatch, RootState } from "@/store";
import { fetchAttendance } from "@/store/AttendanceSlice";
import { fetchUsers } from "@/store/usersSlice";
import { CircleX, Save } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "tamagui";
import AttendanceItem from "./AttendanceItem";
import SimpleSelectOption from "./SimpleSelectOption";

const AttendanceList = () => {
  const [searchParams, setSearchParams] = useState("");
  const [visiableModal, setVisiableModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { items, error } = useSelector((state: RootState) => state.attendances);
  const { items: users } = useSelector((state: RootState) => state.users);

  const handelAbsens = async () => {
    try {
      setLoading(true);
      if (!studentId) return;

      const response = await fetch(`${BASE_URL}/create-absen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        Toast.show({ type: "success", text1: "Absen created successfully" });
        dispatch(fetchAttendance());
        setVisiableModal(false);
        setStudentId("");
      } else {
        Toast.show({ type: "error", text1: "Absen create failed" });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Absen create failed, try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAttendance());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredAttendance = items?.data
    ? items.data.filter((attendance) => {
        const search = searchParams.toLowerCase();
        if (searchParams) {
          return (
            attendance?._id?.toLowerCase().includes(search) ||
            attendance?.studentName?.toLowerCase().includes(search) ||
            attendance?.teamName?.toLowerCase().includes(search) ||
            attendance?.status?.toLowerCase().includes(search)
          );
        }
        return true;
      })
    : [];

  const students =
    users?.data
      ?.filter((user) => user.role === "murid")
      ?.map((user) => ({
        id: user._id,
        name: user.fullName,
        email: user.email,
      })) ?? [];

  return (
    <>
      <View className="my-5 flex-col gap-2 items-center justify-between">
        <View className="w-full flex-row gap-2 items-center justify-between">
          <Input
            className="flex-1"
            placeholder="Nama atau tim atau status"
            value={searchParams}
            onChangeText={setSearchParams}
          />
          <Pressable
            onPress={() => setVisiableModal(true)}
            className="bg-orange-600 px-3 py-2 rounded-lg"
          >
            <Text className="text-lg font-[RobotoRegular] text-white text-center">
              Membuat Absen
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal className="pb-4">
        <View>
          {/* Table Header */}
          <View className="flex-row gap-2 bg-gray-100 p-2 rounded-t">
            {["Nama", "Tim", "Waktu", "Status", "Gps", "Match wajah", "Tindakan"].map(
              (header, i) => (
                <Text
                  key={i}
                  className={`${
                    i === 0 ? "w-36" : "w-28"
                  } font-bold text-lg text-center font-[RobotoRegular]`}
                >
                  {header}
                </Text>
              )
            )}
          </View>
          {/* Table Rows */}
          <FlatList
            data={filteredAttendance}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <AttendanceItem item={item} />}
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visiableModal}
        onRequestClose={() => setVisiableModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#000000d2]">
          <View className="w-[90%] bg-white p-5 rounded-lg">
            <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
              Create Absense
            </Text>

            <View className="mt-5 flex flex-col gap-2">
              <Text className="text-lg font-[RobotoRegular]">Select Student:</Text>
              <SimpleSelectOption
                data={students}
                label="Choose the status"
                valueIsId={true}
                value={studentId}
                setValue={setStudentId}
              />
            </View>

            <View className="flex-row gap-5 justify-end items-center mt-5">
              <Pressable
                className="bg-orange-600 py-2 px-3 rounded-lg flex-row gap-2 items-center justify-center"
                onPress={handelAbsens}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Save size={18} color="#ffffff" />
                    <Text className="text-white font-[RobotoRegular] text-base font-bold text-center">
                      Memperbarui
                    </Text>
                  </>
                )}
              </Pressable>

              <Pressable
                className="bg-red-600 py-2 px-3 rounded-lg flex-row gap-1 items-center justify-center"
                onPress={() => setVisiableModal(false)}
              >
                <CircleX size={18} color="#ffffff" />
                <Text className="text-white font-[RobotoRegular] text-base font-bold text-center">
                  Menutup
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AttendanceList;