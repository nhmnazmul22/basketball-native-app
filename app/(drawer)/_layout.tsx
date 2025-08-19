import { Drawer } from "expo-router/drawer";
import {
  ArrowLeftRight,
  BookA,
  ChartArea,
  LayoutDashboard,
  LogOut,
  Megaphone,
  User,
  Users,
} from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView className="flex-1 bg-red-500">
        <Drawer
          screenOptions={{
            headerTitleStyle: {
              fontFamily: "BebasNeue",
              fontSize: 24,
              letterSpacing: 1.2,
            },
            headerStyle: {
              backgroundColor: "#ffffff",
              height: 80,
            },
            headerTintColor: "#111823",
            drawerStyle: {
              backgroundColor: "#ffffff",
            },
            drawerLabelStyle: {
              fontFamily: "BebasNeue",
              fontSize: 18,
              letterSpacing: 1.2,
            },
            drawerActiveTintColor: "#F97316",
            drawerInactiveTintColor: "#111823",
            headerRight: () => <LogOut style={{ marginRight: 16 }} />,
          }}
        >
          <Drawer.Screen
            name="admin/dashboard"
            options={{
              title: "Dashboard",
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
            name="admin/reports"
            options={{
              title: "Reports & Statistics",
              drawerLabel: "Reports & Statistics",
              drawerIcon: (color) => <ChartArea color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/profile"
            options={{
              title: "Profile",
              drawerLabel: "Profile",
              drawerIcon: (color) => <User color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/createUsers"
            options={{
              title: "Create User",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="admin/createAttendance"
            options={{
              title: "New Attendance",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="admin/scanFace"
            options={{
              title: "Scan Face",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          {/* <Drawer.Screen
            name="admin/createTeam"
            options={{
              title: "Create Team",
              drawerItemStyle: {
                display: "none",
              },
            }}
          /> */}
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
