import ProfileUpdateModal from "@/components/ProfielUpdate";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { AppDispatch, RootState } from "@/store";
import { fetchAttendance } from "@/store/AttendanceSlice";
import { fetchPost } from "@/store/postSlice";
import { fetchUser } from "@/store/userByIdSlice";
import { Attendance } from "@/types";
import { LogOut, Pencil } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const avatar = require("@/assets/images/avater.jpg");
const ProfileScreen = () => {
  const {session, setSession} = useAuth()
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [myAttendace, setMyAttendance] = useState<Attendance[]>([]);
  const [myStrak, setMyStrak] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {items}  = useSelector((state: RootState)=> state.user);
  const {items: posts} = useSelector((state: RootState)=> state.posts);
  const {items: attendanace} = useSelector((state: RootState)=> state.attendances);

  useEffect(()=>{
    dispatch(fetchUser());
    dispatch(fetchPost());
    dispatch(fetchAttendance());
  },[])

  useEffect(()=>{
    if(!session?.user_id) return


    const studentAttendance = attendanace?.data.filter((att)=> att.studentId === session.user_id);
      if(studentAttendance){
        setMyAttendance(studentAttendance);
      }
  },[session.user_id])

  useEffect(()=>{ 
  if(myAttendace.length > 0){
    let myStrak = 0;
      for( const att of myAttendace){
         if(att.status === "absen"){
          myStrak= 0;
         }
         myStrak++
      }
      setMyStrak(myStrak)
    }
  },[myAttendace])


  const user = items?.data;
  const presentAttendace = myAttendace.filter((att)=> att.status === "hadiah" || att.status === "terlambat");
  const avarageAttendace = (presentAttendace.length / myAttendace.length) * 100;

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
          setSession(null);
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
    <ScrollView className="flex-1 bg-white">
      <View className="items-center bg-orange-600 pb-6 pt-12 rounded-b-3xl">
        <View className="relative">
          <Image
            source={user?.profilePicture? {uri: user.profilePicture}: avatar}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </View>
        <Text className="text-xl font-bold text-white mt-4 font-[RobotoRegular]">
          {user?.fullName}
        </Text>
        <Text className="text-sm text-blue-100 font-[RobotoRegular]">
          {user?.email}
        </Text>
      </View>

      <View className="flex-row justify-around py-6 border-b border-slate-200 bg-white">
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-900 font-[RobotoRegular]">
            {posts?.data === null ? "0" : posts?.data.length}
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Posts
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-green-600 font-[RobotoRegular]">
            {avarageAttendace}%
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Attendance
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-orange-600 font-[RobotoRegular]">
            {myStrak} Days
          </Text>
          <Text className="text-slate-500 text-sm font-[RobotoRegular]">
            Streak
          </Text>
        </View>
      </View>

      <View className="p-4">
        <Pressable
          className="flex-row items-center justify-start gap-3 p-4 mb-3 bg-slate-100 rounded-2xl"
          onPress={() => setVisibleEditModal(true)}
        >
          <Pencil size={16} color="#334155" />{" "}
          <Text className="text-slate-700 font-medium font-[RobotoRegular]">
            Edit Profile
          </Text>
        </Pressable>
        <Pressable onPress={handleLogout} disabled={loading} className="flex-row items-center justify-start gap-3 p-4 mb-3 bg-slate-100 rounded-2xl">
          {loading ? <ActivityIndicator size="small" className="text-red-600"/> : (<>
          <LogOut size={16} color="#dc2626" />
          <Text className="text-red-600 font-medium font-[RobotoRegular]">
            Logout
          </Text>
          </>)}
          
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleEditModal}
        onRequestClose={() => {
          setVisibleEditModal(!visibleEditModal);
        }}
      >
        <ProfileUpdateModal
          item={null}
          setVisibleEditModal={setVisibleEditModal}
        />
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
