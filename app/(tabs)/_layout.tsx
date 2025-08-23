import { Tabs, usePathname, useRouter } from "expo-router";
import {
  BookUser,
  CreditCard,
  Home,
  Megaphone,
  MessageSquareText,
} from "lucide-react-native";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const avatar = require("@/assets/images/avater.jpg");

const TabIcon = ({ icon, focused }: any) => {
  return (
    <View
      style={{ padding: 23, marginTop: 22 }}
      className={`size-full justify-center items-center rounded-full ${focused ? "bg-white" : ""}`}
    >
      {icon}
    </View>
  );
};

const HeaderRight = () => {
  const router = useRouter();
  return (
    <Pressable
      style={{ width: 48, height: 48 }}
      className="rounded-full border border-gray-300 me-5"
      onPress={() => router.push("/profile")}
    >
      <Image
        source={avatar}
        resizeMode="cover"
        className="w-full h-full rounded-full "
      />
    </Pressable>
  );
};

const Layout = () => {
  const pathname = usePathname();

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            display: pathname === "/community" ? "none" : "flex",
            backgroundColor:
              "linear-gradient(90deg,rgba(245, 91, 2, 1) 0%, rgba(255, 164, 84, 1) 100%)",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 60,
            paddingHorizontal: 10,
            position: "absolute",
            overflow: "hidden",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 3,
          },
          headerTitleStyle: {
            fontFamily: "BebasNeue",
            fontSize: 24,
          },
          headerRight: () => <HeaderRight />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={
                  <Home
                    color={focused ? "rgba(255, 164, 84, 1)" : "white"}
                    size={28}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={
                  <BookUser
                    color={focused ? "rgba(255, 164, 84, 1)" : "white"}
                    size={28}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="announcement"
          options={{
            title: "Announcement",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={
                  <Megaphone
                    color={focused ? "rgba(255, 164, 84, 1)" : "white"}
                    size={28}
                  />
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="payment"
          options={{
            title: "Payment",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={
                  <CreditCard
                    color={focused ? "rgba(255, 164, 84, 1)" : "white"}
                    size={28}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={
                  <MessageSquareText
                    color={focused ? "rgba(255, 164, 84, 1)" : "white"}
                    size={28}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="createPayment"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
