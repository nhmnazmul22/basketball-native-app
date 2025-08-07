import Splash from "@/components/Splash";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoSemibold: require("../assets/fonts/Roboto-SemiBold.ttf"),
  });

  if (!loaded) {
    return <Splash />;
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}
