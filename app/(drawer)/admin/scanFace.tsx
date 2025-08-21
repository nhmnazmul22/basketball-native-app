import TakePicture from "@/components/TakePicture";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const ScanFace = () => {
  const [photo, setPhoto] = useState<any>(null);

  console.log(photo);
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
          <View className="w-[300px] h-[300px] mx-auto mt-16 rounded-lg">
            <Image
              source={{ uri: photo.uri }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
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
            <Pressable className="bg-orange-600 px-5 py-3 rounded-lg">
              <Text className="font-[RobotoRegular] text-white text-center text-lg">
                Verify Face
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ScanFace;
