import TakePicture from "@/components/TakePicture";
import UserApi from "@/lib/apis/userApi";
import { generateFileName } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchUser } from "@/store/userByIdSlice";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Input, Label } from "tamagui";

const avater = require("@/assets/images/avater.jpg");
export default function AdminSettingPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<any>(null);
  const [capturePic, setCapturePic] = useState<Boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUser());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      if (!items?.data._id) {
        Toast.show({
          type: "error",
          text1: "User ID is missing",
          text2: "Please try again later.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      if (photo) {
        formData.append("image", {
          uri: photo.uri,
          name: generateFileName(photo.uri) || `team-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      const response = await UserApi.updateUser(items.data._id, formData);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: "User updated successfully",
        });
        dispatch(fetchUser());
      } else {
        Toast.show({
          type: "error",
          text1: "Update failed",
          text2: response?.message || "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (items?.data) {
      setFullName(items.data.fullName || "");
      setEmail(items.data.email || "");
      setPhone(items.data.phone || "");
      setRole(items.data.role || "");
    }
  }, [items]);

  if (capturePic && !photo) {
    return <TakePicture photo={photo} setPhoto={setPhoto} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 bg-gray-50 p-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Profile Section */}
      <View className="items-center mb-6">
        <Image
          source={
            photo !== null
              ? { uri: photo.uri }
              : items?.data.profilePicture
                ? { uri: items?.data.profilePicture }
                : avater
          }
          className="w-24 h-24 rounded-full mb-3"
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
            <Text className="text-white font-bold text-center">Ubah foto</Text>
          </Pressable>
        )}
      </View>

      {/* Form Fields */}
      <View className="flex-col gap-4">
        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Nama lengkap
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Masukkan nama lengkap"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            E-mail
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Masukkan email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Telepon
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View className="flex-col">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Peran
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            value={role}
            readOnly
          />
        </View>

        {/* Change Password */}
        {/* <View className="flex-col mt-6 gap-2">
          <Label unstyled className="text-lg font-bold font-[RobotoRegular]">
            Change Password
          </Label>
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Current password"
            secureTextEntry
          />
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="New password"
            secureTextEntry
          />
          <Input
            className="text-base font-[RobotoRegular]"
            placeholder="Confirm new password"
            secureTextEntry
          />
        </View> */}

        {/* Update Button */}
        <Pressable
          className="bg-orange-600 mt-6 py-3 rounded-xl items-center"
          onPress={handleUpdateUser}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-bold text-base font-[RobotoRegular]">
              Perbarui profil
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
