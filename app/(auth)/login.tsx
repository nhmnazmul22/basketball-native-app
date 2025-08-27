import { BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { decodeToken, saveData } from "@/lib/utils";
import { Session } from "@/types";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Input } from "tamagui";

const logo = require("@/assets/images/logo.png");
const width = Dimensions.get("window").width;

export default function LoginPage() {
  const { session, setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Please, input the required fields",
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: data.message,
        });
        return;
      }

      await saveData({ token: data.data });
      const decodedData = decodeToken(data.data);
      setSession(decodedData as Session);

      Toast.show({
        type: "success",
        text1: data.message,
      });

      router.replace("/loading"); // or redirect logic can go here safely
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Safe redirect handling INSIDE useEffect (or return side-effect-free)
  if (session) {
    if (session.role === "admin" || session.role === "pelatih") {
      return <Redirect href="/admin/dashboard" />;
    } else {
      return <Redirect href="/" />;
    }
  }

  // ✅ No hooks conditionally skipped — now safe
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ffffff"}}
      behavior={"padding"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 items-start justify-start">
          <ScrollView
            className="flex-1 p-5 bg-white"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              minHeight: "100%",
              paddingBottom: 20,
            }}
          >
            <View
              style={{ width: width * 0.9 }}
              className="p-5 w-full mt-24 mx-auto"
            >
              <View className="w-36 h-36">
                <Image
                  source={logo}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>

              <View className="mt-5">
                <Text className="text-4xl font-[BebasNeue] text-orange-600">
                  Selamat Datang kembali,
                </Text>
                <Text className="text-xl font-[RobotoRegular] text-gray-500">
                  Akun login untuk melanjutkan
                </Text>
              </View>

              <View className="flex-col gap-3 mt-5 w-full">
                <View className="flex-col gap-1">
                  <Text className="text-lg font-[RobotoRegular] text-black">
                    E-mail: <Text className="text-orange-600">*</Text>
                  </Text>
                  <Input
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View className="flex-col gap-1">
                  <Text className="text-lg font-[RobotoRegular] text-black">
                    Password: <Text className="text-orange-600">*</Text>
                  </Text>
                  <Input
                    secureTextEntry
                    placeholder="Masukkan kata sandi baru"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <View className="mt-5">
                  <Pressable
                    className="bg-orange-600 px-2 py-3 rounded-lg"
                    onPress={handleLogin}
                  >
                    {loading ? (
                      <ActivityIndicator size={24} color="white" />
                    ) : (
                      <Text className="text-lg font-[RobotoRegular] text-white text-center">
                        Login
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
