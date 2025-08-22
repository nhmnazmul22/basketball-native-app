import { BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { removeData } from "@/lib/utils";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  ArrowLeftRight,
  BookA,
  ChartArea,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  User,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const LogOutComponent = () => {
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        await removeData();
        setSession(null);
        router.replace("/login");
        Toast.show({
          type: "success",
          text1: "Logout successful",
        });
      }
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: err.message && err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <LogOut style={{ marginRight: 16 }} />
      )}
    </Pressable>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView className="flex-1">
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
            headerRight: () => <LogOutComponent />,
          }}
        >
          <Drawer.Screen
            name="admin/dashboard"
            options={{
              title: "Dasbor",
              drawerLabel: "Dasbor",
              drawerIcon: (color) => <LayoutDashboard color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/attendance"
            options={{
              title: "Kehadiran",
              drawerLabel: "Kehadiran",
              drawerIcon: (color) => <BookA color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/user-management"
            options={{
              title: "Manajemen Pengguna",
              drawerLabel: "Manajemen Pengguna",
              drawerIcon: (color) => <User color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/team-management"
            options={{
              title: "Manajemen Tim",
              drawerLabel: "Manajemen Tim",
              drawerIcon: (color) => <Users color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/transaction"
            options={{
              title: "Transaksi",
              drawerLabel: "Transaksi",
              drawerIcon: (color) => <ArrowLeftRight color={color.color} />,
            }}
          />

          <Drawer.Screen
            name="admin/announcement"
            options={{
              title: "Pengumuman",
              drawerLabel: "Pengumuman",
              drawerIcon: (color) => <Megaphone color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/reports"
            options={{
              title: "Laporan & Statistik",
              drawerLabel: "Laporan & Statistik",
              drawerIcon: (color) => <ChartArea color={color.color} />,
            }}
          />
          <Drawer.Screen
            name="admin/profile"
            options={{
              title: "Pengaturan",
              drawerLabel: "Pengaturan",
              drawerIcon: (color) => <Settings color={color.color} />,
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
          <Drawer.Screen
            name="admin/createTeam"
            options={{
              title: "Create Team",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
