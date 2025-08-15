import { Link } from "expo-router";
import React, { useState } from "react";
import {
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
import { Input } from "tamagui";

const width = Dimensions.get("window").width;
const logo = require("@/assets/images/logo.png");
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
              className="p-5 w-full mt-10 mx-auto"
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
                  Welcome to Basketball,
                </Text>
                <Text className="text-xl font-[RobotoRegular] text-gray-500">
                  Create a new account to continue
                </Text>
              </View>
              <View className="flex-col w-full gap-3 mt-5">
                <View className="flex-col gap-1">
                  <Text className="text-lg font-[RobotoRegular] text-black">
                    Name: <Text className="text-orange-600">*</Text>
                  </Text>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </View>

                <View className="flex-col gap-1">
                  <Text className="text-lg font-[RobotoRegular] text-black">
                    Whatsapp Number: <Text className="text-orange-600">*</Text>
                  </Text>
                  <Input
                    placeholder="Enter your whatsapp number"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                  />
                </View>
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
                  <Pressable className="bg-orange-600 px-2 py-3 rounded-lg">
                    {/* <ActivityIndicator size={24} color="white"/> */}
                    <Text className="text-lg font-[RobotoRegular] text-white text-center">
                      Register
                    </Text>
                  </Pressable>
                  <Text className="text-lg font-[RobotoRegular] text-black text-center mt-5">
                    Already have an account?{" "}
                    <Link href="/login" className="text-orange-600 underline">
                      Login
                    </Link>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;
