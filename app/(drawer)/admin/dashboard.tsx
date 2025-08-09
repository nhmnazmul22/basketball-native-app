import { Link } from "expo-router";
import { Eye } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const avatarImg = require("@/assets/images/avater.jpg");
export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);

  // Page Refresh Function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 p-8 bg-slate-50"
    >
      <Text className="text-2xl font-[BebasNeue] mb-2 tracking-wider">
        Today's Stats,
      </Text>
      <View className="flex gap-3">
        <View className="bg-orange-600 w-full p-5 rounded-lg flex-row justify-between items-center">
          <Text className="font-[BebasNeue] tracking-wider text-3xl text-white">
            Attendance:
          </Text>
          <Text className="font-[BebasNeue] tracking-wider text-4xl text-white">
            20
          </Text>
        </View>
        <View className="bg-indigo-600  w-full p-5 rounded-lg flex-row justify-between items-center">
          <Text className="font-[BebasNeue] tracking-wider text-3xl text-white">
            Payments:
          </Text>
          <Text className="font-[BebasNeue] text-4xl text-white">
            20,000 Rp
          </Text>
        </View>
        <View className="bg-green-600  w-full p-5 rounded-lg flex-row justify-between items-center">
          <Text className="font-[BebasNeue] tracking-wider text-3xl text-white">
            Income:
          </Text>
          <Text className="font-[BebasNeue] text-4xl text-white">
            200,000 Rp
          </Text>
        </View>
        <View className="bg-red-600  w-full p-5 rounded-lg flex-row justify-between items-center">
          <Text className="font-[BebasNeue] tracking-wider text-3xl text-white">
            Expenses:
          </Text>
          <Text className="font-[BebasNeue] text-4xl text-white">
            75,000 Rp
          </Text>
        </View>
      </View>

      <View className="mt-10">
        <Text className="text-2xl font-[BebasNeue] mb-3 tracking-wider">
          Latest Users,
        </Text>
        <View className="gap-3 pb-20">
          <View className="bg-white elevation-sm p-3 rounded-lg border border-orange-50 flex-row justify-between items-center">
            <View className=" flex-row items-center gap-5">
              <Image source={avatarImg} className="w-[60px] h-[60px]" />
              <View>
                <Text className="text-2xl font-[BebasNeue] tracking-widest">
                  Nhm Nazmul
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Role: Student
                  </Text>
                  <Text className="text-gray-500">|</Text>
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Team: U12
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Link href="/admin/user-management">
                <Eye />
              </Link>
            </View>
          </View>
          <View className="bg-white elevation-sm p-3 rounded-lg border border-orange-50 flex-row justify-between items-center">
            <View className=" flex-row items-center gap-5">
              <Image source={avatarImg} className="w-[60px] h-[60px]" />
              <View>
                <Text className="text-2xl font-[BebasNeue] tracking-widest">
                  Rakib Khan
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Role: Couch
                  </Text>
                  <Text className="text-gray-500">|</Text>
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Team: U12
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Link href="/admin/user-management">
                <Eye />
              </Link>
            </View>
          </View>
          <View className="bg-white elevation-sm p-3 rounded-lg border border-orange-50 flex-row justify-between items-center">
            <View className=" flex-row items-center gap-5">
              <Image source={avatarImg} className="w-[60px] h-[60px]" />
              <View>
                <Text className="text-2xl font-[BebasNeue] tracking-widest">
                  Abdur Rahim
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Role: Student
                  </Text>
                  <Text className="text-gray-500">|</Text>
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Team: U15
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Link href="/admin/user-management">
                <Eye />
              </Link>
            </View>
          </View>
          <View className="bg-white elevation-sm p-3 rounded-lg border border-orange-50 flex-row justify-between items-center">
            <View className=" flex-row items-center gap-5">
              <Image source={avatarImg} className="w-[60px] h-[60px]" />
              <View>
                <Text className="text-2xl font-[BebasNeue] tracking-widest">
                  Abdur Rahim
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Role: Student
                  </Text>
                  <Text className="text-gray-500">|</Text>
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Team: U15
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Link href="/admin/user-management">
                <Eye />
              </Link>
            </View>
          </View>
          <View className="bg-white elevation-sm p-3 rounded-lg border border-orange-50 flex-row justify-between items-center">
            <View className=" flex-row items-center gap-5">
              <Image source={avatarImg} className="w-[60px] h-[60px]" />
              <View>
                <Text className="text-2xl font-[BebasNeue] tracking-widest">
                  Abdur Rahim
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Role: Student
                  </Text>
                  <Text className="text-gray-500">|</Text>
                  <Text className="text-lg text-gray-500 font-[RobotoRegular]">
                    Team: Core
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Link href="/admin/user-management">
                <Eye />
              </Link>
            </View>
          </View>
          <Pressable className="bg-orange-600 w-32 px-5 py-3 rounded-md mx-auto">
            <Text className="text-white text-xl text-center font-[BebasNeue] tracking-wider">
              See More
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
