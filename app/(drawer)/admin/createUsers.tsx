import SimpleSelectOption from "@/components/SimpleSelectOption";
import TakePicture from "@/components/TakePicture";
import { roles, userStatus } from "@/constants";
import UserApi from "@/lib/apis/userApi";
import { generateFileName } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchTeams } from "@/store/teamsSlice";
import { fetchUsers } from "@/store/usersSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
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
import { Input } from "tamagui";

const profilePicture = require("@/assets/images/profile-picture.jpg");
const width = Dimensions.get("window").width;



const CreateStudent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [team, setTeam] = useState("");
  const [teamId, setTeamId] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [capturePic, setCapturePic] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.teams);
  const router = useRouter();

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setDate(new Date());
    setTeam("");
    setTeamId("");
    setRole("");
    setStatus("");
    setPhoto(null);
    setCapturePic(false);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("dob", date.toISOString());
      formData.append("teamId", teamId);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("status", status);
      if (photo) {
        formData.append("image", {
          uri: photo.uri,
          name: generateFileName(photo.uri) || `team-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      if (role === "student" && !photo) {
        Toast.show({
          type: "error",
          text1: "For student, please add a profile picture",
        });
        return;
      }

      const response = await UserApi.createUser(formData);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: "User created successfully",
        });
        reset();
        router.push("/admin/user-management");
        dispatch(fetchUsers());
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      const selectedTeam = items?.data.find((item) => item.name === team);
      if (selectedTeam) {
        setTeamId(selectedTeam._id);
      } else {
        setTeamId("");
      }
    }
  }, [team]);

  if (capturePic && !photo) {
    return <TakePicture photo={photo} setPhoto={setPhoto} />;
  }

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
              <View className="flex-col gap-3 p-2 w-44">
                <Image
                  source={photo !== null ? { uri: photo.uri } : profilePicture}
                  className="w-40 h-40 object-cover rounded-lg border border-slate-200"
                />
                {photo ? (
                  <Pressable
                    className="bg-orange-600 px-4 py-2 rounded-md"
                    onPress={() => {
                      setCapturePic(true);
                      setPhoto(null);
                    }}
                  >
                    <Text className="text-white font-bold text-center">
                      Foto pengambilan ulang
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    className="bg-orange-600 px-4 py-2 rounded-md"
                    onPress={() => setCapturePic(true)}
                  >
                    <Text className="text-white font-bold text-center">
                      Tambahkan foto
                    </Text>
                  </Pressable>
                )}
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Nama: <Text className="text-orange-600">*</Text>
                </Text>
                <Input
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Nomor whatsapp: <Text className="text-orange-600">*</Text>
                </Text>
                <Input
                  placeholder="Masukkan nomor whatsapp Anda"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Tanggal lahir (DOB):{" "}
                  <Text className="text-orange-600">*</Text>
                </Text>
                <Pressable onPress={() => setShow(true)}>
                  <Input
                    readOnly
                    className="text-lg font-[RobotoRegular]"
                    placeholder="Enter your name"
                    value={date.toLocaleDateString()}
                  />
                </Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular]">
                  Tim <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={items?.data}
                  label="Pilih tim"
                  value={team}
                  setValue={setTeam}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Peran: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={roles}
                  label="Pilih peran"
                  value={role}
                  setValue={setRole}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg  font-[RobotoRegular]">
                  Status: <Text className="text-orange-600">*</Text>
                </Text>
                <SimpleSelectOption
                  data={userStatus}
                  label="Pilih status"
                  value={status}
                  setValue={setStatus}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  E-mail: <Text className="text-orange-600">*</Text>
                </Text>
                <Input
                  placeholder="Masukkan e-mail Anda"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-lg font-[RobotoRegular] text-black">
                  Password: <Text className="text-orange-600">*</Text>
                </Text>
                <Input
                  secureTextEntry
                  placeholder="Masukkan password baru"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>

              <View className="mt-5">
                <Pressable
                  className="bg-orange-600 px-2 py-3 rounded-lg"
                  onPress={() => handleCreateUser()}
                >
                  {loading && (
                    <View className="flex-row gap-2 items-center justify-center">
                      <ActivityIndicator size={24} color="white" />{" "}
                      <Text className="text-lg font-[RobotoRegular] text-white text-center">
                        Membuat Pengguna...
                      </Text>
                    </View>
                  )}
                  {!loading && (
                    <Text className="text-lg font-[RobotoRegular] text-white text-center">
                      Buat Pengguna
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

export default CreateStudent;
