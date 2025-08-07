import { Drawer } from "expo-router/drawer";
import {
  ArrowLeftRight,
  BookA,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Users,
} from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 ">
      <GestureHandlerRootView className="flex-1">
        <Drawer
          screenOptions={{
            headerTitleStyle: {
              fontFamily: "BebasNeue",
              fontSize: 24,
              letterSpacing: 2,
            },
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTintColor: "#111823",
            drawerStyle: {
              backgroundColor: "#ffffff",
            },
            drawerLabelStyle: {
              fontFamily: "BebasNeue",
              fontSize: 18,
              letterSpacing: 1.5,
            },
            drawerActiveTintColor: "#F97316",
            drawerInactiveTintColor: "#111823",
            headerRight: () => <LogOut style={{ marginRight: 16 }} />,
          }}
        >
          <Drawer.Screen
            name="admin/dashboard"
            options={{
              title: "Admin Dashboard",
              drawerLabel: "Dashboard",
              drawerIcon: (color) => <LayoutDashboard color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/attendance"
            options={{
              title: "Attendance",
              drawerLabel: "Attendance",
              drawerIcon: (color) => <BookA color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/transaction"
            options={{
              title: "Transactions",
              drawerLabel: "Transactions",
              drawerIcon: (color) => <ArrowLeftRight color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/user-management"
            options={{
              title: "User Management",
              drawerLabel: "User Management",
              drawerIcon: (color) => <Users color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/announcement"
            options={{
              title: "Announcements",
              drawerLabel: "Announcements",
              drawerIcon: (color) => <Megaphone color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/setting"
            options={{
              title: "Settings",
              drawerLabel: "Settings",
              drawerIcon: (color) => <Settings color={color.color} />,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
