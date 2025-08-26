import Splash from "@/components/Splash";
import AuthProvider from "@/context/AuthContext";
import GroupProvider from "@/context/GroupContext";
import { store } from "@/store";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import "../global.css";
import { tamaguiConfig } from "../tamagui.config";

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
    <Provider store={store}>
      <AuthProvider>
        <GroupProvider>
          <TamaguiProvider config={tamaguiConfig}>
          <Slot />
          <StatusBar style="auto" />
          <Toast />
        </TamaguiProvider>
        </GroupProvider>
      </AuthProvider>
    </Provider>
  );
}
