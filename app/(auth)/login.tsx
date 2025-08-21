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
      setLoading(true);
      const loginObj = {
        email,
        password,
      };

      if (!loginObj.email || !loginObj.password) {
        Toast.show({
          type: "error",
          text1: "Please, input the require field",
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginObj),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: data.message,
        });
        return;
      }

      // Save the token
      await saveData({ token: data.data });
      const decodedData = decodeToken(data.data);
      setSession(decodedData as Session);
      router.replace("/loading");
      Toast.show({
        type: "success",
        text1: data.message,
      });
      return;
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.message && err.message,
      });
    } finally {
      setLoading(false);
    }
  };



  if (session) {
    if (session.role === "admin" || session.role === "coach") {
      return <Redirect href="/admin/dashboard" />;
    } else {
      return <Redirect href="/" />;
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 items-start justify-start">
          <ScrollView
            className="flex-1 p-5 bg-white"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              minHeight: "100%",
              paddingBottom: 50,
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
                <Text className="text-5xl font-[BebasNeue] text-orange-600">
                  Welcome Back,
                </Text>
                <Text className="text-xl font-[RobotoRegular] text-gray-500">
                  Login account to continue
                </Text>
              </View>
              <View className="flex-col gap-3 mt-5 w-full">
                <View className="flex-col gap-1">
                  <Text className="text-lg font-[RobotoRegular] text-black">
                    Email: <Text className="text-orange-600">*</Text>
                  </Text>
                  <Input
                    placeholder="Enter your email"
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
                    placeholder="Enter new password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View className="mt-5">
                  <Pressable
                    className="bg-orange-600 px-2 py-3 rounded-lg"
                    onPress={handleLogin}
                  >
                    {loading && <ActivityIndicator size={24} color="white" />}
                    {!loading && (
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
