import SimpleSelectOption from "@/components/SimpleSelectOption";
import { BASE_URL } from "@/config";
import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/usersSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Input, TextArea } from "tamagui";

const profilePicture = require("@/assets/images/profile-picture.jpg");
const width = Dimensions.get("window").width;

const transStatus = [
  { _id: 1, name: "dibayar" },
  { _id: 2, name: "dibatalkan" },
  { _id: 3, name: "menunggu" },
];

const transType = [
  { _id: 1, name: "penghasilan" },
  { _id: 2, name: "pengeluaran" },
];

const transMethod = [
  { _id: 1, name: "cash" },
  { _id: 2, name: "transfer" },
  { _id: 3, name: "kredit" },
];

const CreateTransaction = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.users);
  const router = useRouter();

  const reset = () => {
    setStudentId("");
    setAmount("");
    setMethod("");
    setType("");
    setStatus("");
  };

  const createTransaction = async () => {
    try {
      setLoading(true);
      const transactionDate = {
        studentId,
        amount,
        method,
        type,
        status,
        remark,
      };

      const res = await fetch(`${BASE_URL}/create-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionDate),
      });

      if (res.ok) {
        Toast.show({
          type: "success",
          text1: "Transaction created successfully",
        });
        reset();
        router.push("/admin/transaction");
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed to create transaction",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const studentData: any = [];

  items?.data.forEach((user) => {
    if (user.role === "murid") {
      studentData.push({ _id: user._id, name: user.fullName });
    }
  });

  useEffect(() => {
    const selectedStudent = items?.data.find(
      (user) => user.fullName === studentName
    );

    if (selectedStudent && selectedStudent?._id) {
      setStudentId(selectedStudent?._id);
    }
  }, [studentName]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 p-5 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 80,
          }}
        >
          <View style={{ width: width * 0.9 }} className="w-full mx-auto">
            <View className="flex-col w-full gap-3 mt-5">
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Murid: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={studentData}
                  label="Pilih siswa"
                  value={studentName}
                  setValue={setStudentName}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Jumlah: <Text className="text-orange-600">*</Text>
                </Text>
                <Input
                  placeholder="Masukkan jumlah"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Metode: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={transMethod}
                  label="Pilih metode"
                  value={method}
                  setValue={setMethod}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Jenis: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={transType}
                  label="Pilih jenis"
                  value={type}
                  setValue={setType}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Status: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={transStatus}
                  label="Pilih status"
                  value={status}
                  setValue={setStatus}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Komentar: <Text className="text-orange-600">*</Text>
                </Text>
                <TextArea
                  placeholder="Masukkan komentar"
                  value={remark}
                  onChangeText={(text) => setRemark(text)}
                />
              </View>
              <View className="mt-5">
                <Pressable
                  className="bg-orange-600 px-2 py-3 rounded-lg"
                  onPress={() => createTransaction()}
                >
                  {loading && (
                    <View className="flex-row gap-2 items-center justify-center">
                      <ActivityIndicator size={24} color="white" />{" "}
                      <Text className="text-lg font-[RobotoRegular] text-white text-center">
                        Membuat transaksi...
                      </Text>
                    </View>
                  )}
                  {!loading && (
                    <Text className="text-lg font-[RobotoRegular] text-white text-center">
                      Buat transaksi
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateTransaction;
