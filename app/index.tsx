import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const isAuthentication = false;

  if (!isAuthentication) {
    return <Redirect href="/register" />;
  }

  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
}
