import { useRouter } from "expo-router";
import { Smile, Sun } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const faceScanImg = require("@/assets/images/face-scan.png");
const CreateAttendance = () => {
  const router = useRouter();
  
  
  
  
  
  
  
  
  
  
  
  
  return (
    <ScrollView
      className="flex-1 p-5 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 80,
      }}
    >
      <View className="mt-5">
        <Text className="font-[BebasNeue] text-4xl tracking-wider text-center">
          Live Face Detection
        </Text>
        <Text className="font-[RobotoRegular] text-gray-600 text-base text-center">
          Scan student face to verify attendance{" "}
        </Text>
      </View>
      <View className="w-[260px] h-[260px] mx-auto mt-16">
        <Image
          source={faceScanImg}
          resizeMode="cover"
          className="w-full h-full"
        />
      </View>
      <View className="flex-row flex-wrap justify-between items-center gap-3 mt-16 w-full max-w-[90%] mx-auto">
        <View className="flex-row items-center gap-2">
          <Smile size={22} color="#4b5563" />
          <Text className="font-[RobotoRegular] text-gray-600 text-lg">
            Uncovered Face
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Sun size={22} color="#4b5563" />
          <Text className="font-[RobotoRegular] text-gray-600 text-lg">
            Better Lighting
          </Text>
        </View>
      </View>
      <View className="mt-24">
        <Pressable
          className="bg-orange-600 px-2 py-3 rounded-lg"
          onPress={() => router.push("/admin/scanFace")}
        >
          <Text className="font-[RobotoRegular] text-white text-center text-lg">
            Scan Face
          </Text>
        </Pressable>
        <Text className="font-[RobotoRegular] text-gray-600 text-base text-center mt-3">
          We will automatic scan the face
        </Text>
      </View>
    </ScrollView>
  );
};

export default CreateAttendance;
