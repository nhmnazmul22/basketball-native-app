import TakePicture from "@/components/TakePicture";
import { BASE_URL } from "@/config";
import { generateFileName } from "@/lib/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const ScanFace = () => {
  const [photo, setPhoto] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const createAttendance = async () => {
    try {
      setIsVerifying(true);

      if (!photo) {
        Toast.show({
          type: "error",
          text1: "Please take a photo before verifying.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("image", {
        uri: photo.uri,
        name: generateFileName(photo.uri) || `team-${Date.now()}.jpg`,
        type: "image/jpeg",
      } as any);

      const res = await fetch(`${BASE_URL}/create-attendance`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        Toast.show({
          type: "error",
          text1: error.message || "Failed to face verify.",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Face Verify successfully.",
      });
      router.push("/admin/attendance");
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: err.message || "Failed to create attendance.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {!photo ? (
        <TakePicture photo={photo} setPhoto={setPhoto} />
      ) : (
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
              Picture take successful
            </Text>
            <Text className="font-[RobotoRegular] text-gray-600 text-base text-center">
              Now Verify your face or retake new picture
            </Text>
          </View>
          <View className="w-[300px] h-[300px] mx-auto mt-16 rounded-lg relative">
            <Image
              source={{ uri: photo.uri }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
            {isVerifying && (
              <View className="absolute inset-0 flex items-center justify-center bg-[#0000008c] rounded-lg">
                <Text className="font-[RobotoRegular] text-white text-xl text-center">
                  Face Verifying...
                </Text>
              </View>
            )}
          </View>

          <View className="mt-24 flex-row gap-3 justify-center items-center">
            <Pressable
              className="bg-indigo-600 px-5 py-3 rounded-lg"
              onPress={() => {
                setPhoto(null);
              }}
            >
              <Text className="font-[RobotoRegular] text-white text-center text-lg">
                Retake
              </Text>
            </Pressable>
            <Pressable
              className="bg-orange-600 px-5 py-3 rounded-lg"
              onPress={createAttendance}
            >
              {isVerifying ? (
                <Text className="font-[RobotoRegular] text-white text-center text-lg">
                  Verifying...
                </Text>
              ) : (
                <Text className="font-[RobotoRegular] text-white text-center text-lg">
                  Verify Face
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ScanFace;
