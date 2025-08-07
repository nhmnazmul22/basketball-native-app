import { Drawer } from "expo-router/drawer";
import {
  ArrowLeftRight,
  BookA,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
} from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
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
