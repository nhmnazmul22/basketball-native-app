import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import UserItem from "./UserItem";

const userData = [
  {
    userId: "USR001",
    name: "John Carter",
    dob: "2005-09-10",
    team: "U12",
    role: "student",
    email: "john.carter@example.com",
    phone: "+1 555-0101",
    location: "New York, USA",
    faceIdRegistered: true,
    lastAttendance: {
      date: "2025-08-10",
      location: "Court 1",
      status: "Present",
    },
    lastPayment: {
      amount: 2000,
      method: "Bank Transfer",
      remark: "Monthly fees",
    },
  },
  {
    userId: "USR002",
    name: "Liam Smith",
    dob: "2003-09-10",
    team: "U15",
    role: "couch",
    email: "liam.smith@example.com",
    phone: "+1 555-0102",
    location: "Chicago, USA",
    faceIdRegistered: false,
  },
  {
    userId: "USR003",
    name: "Emma Brown",
    dob: "2000-12-20",
    team: "U12",
    role: "student",
    email: "emma.brown@example.com",
    phone: "+1 555-0103",
    location: "Los Angeles, USA",
    faceIdRegistered: true,
    lastAttendance: {
      date: "2025-08-10",
      location: "Court 1",
      status: "Present",
    },
    lastPayment: {
      amount: 2000,
      method: "Bank Transfer",
      remark: "Monthly fees",
    },
  },
  {
    userId: "USR004",
    name: "Noah Johnson",
    dob: "2009-05-10",
    team: "U15",
    role: "admin",
    email: "noah.johnson@example.com",
    phone: "+1 555-0104",
    location: "Houston, USA",
    faceIdRegistered: true,
  },
];

const UserList = () => {
  return (
    <ScrollView horizontal className="pb-4">
      <View>
        {/* Table Header */}
        <View className="flex-row gap-5 bg-gray-100 p-2 rounded-t">
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            UserId
          </Text>
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            Name
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            DOB
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Team
          </Text>
          <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
            Role
          </Text>
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            Face Registered
          </Text>
          <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
            Actions
          </Text>
        </View>
        {/* Table Rows */}
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <UserItem item={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default UserList;
