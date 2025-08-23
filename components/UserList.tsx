import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/usersSlice";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "tamagui";
import TableError from "./TableError";
import TableLoading from "./TableLoading";
import UserItem from "./UserItem";

const UserList = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const filteredUser = items?.data.filter((user) => {
    const search = searchParams.toLowerCase();

    if (searchParams) {
      return (
        //@ts-ignore
        user._id.toLowerCase().includes(search) ||
        user.fullName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search)
      );
    } else {
      return true;
    }
  });

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <>
      <View className="mb-5 mt-8 flex-row items-center justify-between">
        <View style={{ width: "100%" }}>
          <Input
            placeholder="UserId, name, email, role..."
            value={searchParams}
            onChangeText={(text) => setSearchParams(text)}
          />
        </View>
      </View>
      <ScrollView horizontal className="pb-4 ">
        <View className="w-full">
          {items?.data && items?.data.length > 0 && (
            <>
              {/* Table Header */}
              <View className="flex-row gap-5 bg-gray-100 p-2 rounded-t">
                <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
                  Pengguna
                </Text>
                <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
                  Nama
                </Text>
                <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
                  Dob
                </Text>
                <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
                  Tim
                </Text>
                <Text className="w-20 font-bold text-lg text-center font-[RobotoRegular]">
                  Peran
                </Text>
                <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
                  Wajah terdaftar{" "}
                </Text>
                <Text className="w-28 font-bold text-lg text-center font-[RobotoRegular]">
                  Tindakan
                </Text>
              </View>
              {/* Table Rows */}

              <FlatList
                data={filteredUser}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <UserItem item={item} />}
              />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default UserList;
