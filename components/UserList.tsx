import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/usersSlice";
import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TableError from "./TableError";
import TableLoading from "./TableLoading";
import UserItem from "./UserItem";

const userData = [
  {
    userId: "USR001",
    name: "John Carter",
    dob: "2005-09-10",
    team: "U12",
    role: "Student",
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
    role: "Couch",
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
    role: "Student",
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
    role: "Admin",
    email: "noah.johnson@example.com",
    phone: "+1 555-0104",
    location: "Houston, USA",
    faceIdRegistered: true,
  },
];

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <ScrollView horizontal className="pb-4 ">
      <View className="w-full">
        {items?.data && items?.data.length > 0 && (
          <>
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
              data={items?.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <UserItem item={item} />}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default UserList;
