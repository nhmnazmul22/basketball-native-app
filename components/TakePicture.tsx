import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Camera, Shield, ShieldAlert, SwitchCamera } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface Props {
  photo: any;
  setPhoto: Dispatch<SetStateAction<any>>;
}

const TakePicture = ({ photo, setPhoto }: Props) => {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="w-[80%] mx-auto items-center justify-center shadow-lg bg-indigo-600 p-5 rounded-lg">
          <ShieldAlert size={80} color="#ffffff" />
          <Text className="text-lg font-[RobotoRegular] text-white my-5">
            Pleaser Give permission to take picture
          </Text>
          <Pressable
            className="bg-white px-3 py-2 rounded-lg"
            onPress={requestPermission}
          >
            <Text className="text-lg font-[RobotoRegular] text-black">
              Grant Permission
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="w-[80%] mx-auto items-center justify-center shadow-lg bg-indigo-600 p-5 rounded-lg">
          <Shield size={80} color="#ffffff" />
          <Text className="text-lg font-[RobotoRegular] text-white my-5 text-center">
            We need your permission to show the camera
          </Text>
          <Pressable
            className="bg-white px-3 py-2 rounded-lg"
            onPress={requestPermission}
          >
            <Text className="text-lg font-[RobotoRegular] text-black">
              Grant Permission
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true, // so you can send it to backend
      });
      console.log("Captured picture:", picture.uri);
      setPhoto(picture);
    }
  };
  return (
    <CameraView
      ref={cameraRef}
      mode="picture"
      facing={facing}
      onCameraReady={() => {
        console.log("Camera is ready");
      }}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View className="mb-16 flex-row justify-center gap-24 ">
        <TouchableOpacity onPress={toggleCameraFacing}>
          <SwitchCamera size={44} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Camera size={44} color="white" />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

export default TakePicture;
