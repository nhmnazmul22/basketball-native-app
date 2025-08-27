import { useAuth } from '@/context/AuthContext';
import { useGroup } from '@/context/GroupContext';
import GroupApi from '@/lib/apis/groupApi';
import { AppDispatch, RootState } from '@/store';
import { fetchGroup } from '@/store/groupSlice';
import { useRouter } from 'expo-router';
import { Plus, Trash } from 'lucide-react-native';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import TableError from './TableError';
import TableLoading from './TableLoading';


interface Props {
    setTab: Dispatch<SetStateAction<string>>;
}

// Dummy data
const users = [
  { id: 1, name: "Coach Rahim", role: "Coach" },
  { id: 2, name: "Student A", role: "Student" },
  { id: 3, name: "Student B", role: "Student" },
];

const GroupScreen = ({setTab}: Props) => {
  const {session } = useAuth();
  const {setGroupId} = useGroup();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {items, loading: groupLoading, error} = useSelector((state: RootState)=> state.groups)
  const router = useRouter();


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchGroup())
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);


  const handelJoin = async (groupId: string)=>{
    try{
      setLoading(true);
      const response = await GroupApi.updateGroup(groupId, {membersIds:[session.user_id]})
      if(response.success){
        Toast.show({
          type:"success",
          text1: response.message
        })
        onRefresh()
      }else{
        Toast.show({
          type: 'error',
          text1: response.message
        })
        setLoading(false)
      }
    }finally{
      setLoading(false)
    }
  }

  const handelDelete = async (groupId: string) =>{
    try{
      setLoading(true);
      const response = await GroupApi.deleteGroup(groupId);

      if(response.success){
        Toast.show({
          type:"success",
          text1: response.message
        })
        onRefresh()
      }else{
        Toast.show({
          type: "error",
          text1: response.message
        })
      
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      dispatch(fetchGroup());
    },[dispatch])


  if (groupLoading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
   <ScrollView refreshControl={
           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         } className="p-4">
       <View className='flex-row justify-between items-center mb-5'>
          <Text className="text-xl font-bold mb-3">Groups</Text>
          {(session.role === "admin" || session.role === "pelatih") && (  
            <Pressable onPress={()=> setTab("Create Group")} className="bg-orange-600 flex-row gap-2 justify-center items-center py-2 px-4 rounded-lg">
              <Plus size={20} color="#ffffff" />
              <Text className="text-white font-[RobotoRegular]">Create Group</Text>
            </Pressable>
            )}
       </View>
         <View className="flex-col gap-4">
           {items?.data ? items?.data.map((group) => {
             const joined = group.membersIds.includes(session.user_id);
           return (
              <View
               key={group._id}
               className="flex-row items-center justify-between bg-white rounded-lg p-3 border border-gray-200 shadow-lg"
             >
               <View>
                 <Text className="font-bold font-[RobotoRegular]">
                   {group.groupName}
                 </Text>
                 <Text className="text-sm text-slate-500 font-[RobotoRegular]">
                  Members: {group.membersIds.length}
                 </Text>
               </View>
              
               <View className='flex-row gap-2 items-center'>
                {joined ? (
                <Pressable onPress={()=> {
                  setGroupId(group._id)
                  setTab("Messages")
                }} className="bg-orange-600 px-3 py-1 rounded-lg">
                 <Text className="text-white font-bold font-[RobotoRegular]">
                   Message
                 </Text>
               </Pressable>
                ): <Pressable onPress={()=> handelJoin(group._id)} className="bg-orange-600 px-3 py-1 rounded-lg">
                 {loading ? <ActivityIndicator size="small" className='text-white'/> : (
                  <Text className="text-white font-bold font-[RobotoRegular]">
                   Join
                 </Text>
                 )}
               </Pressable> }
                  
              {session.role === "admin" && (
                <Pressable onPress={()=> handelDelete(group._id)} className="px-3 py-1 rounded-lg">
                 {loading ? <ActivityIndicator size="small" className='text-white'/> : (
                  <Trash size={24} className='text-red-500'/>
                 )}
               </Pressable>
              )}

               </View>
             </View>
            )
           }): (
            <Text className='text-center text-gray-600 my-5 italic text-lg'>No group found!!</Text>
           )}
         </View>
       </ScrollView>
  )
}

export default GroupScreen