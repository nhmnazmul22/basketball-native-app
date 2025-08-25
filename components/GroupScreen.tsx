import { Plus } from 'lucide-react-native';
import { Dispatch, SetStateAction } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';


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
  return (
   <ScrollView className="p-4">
         <View className='flex-row justify-between items-center mb-5'>
          <Text className="text-xl font-bold mb-3">Groups</Text>
          <Pressable onPress={()=> setTab("Create Group")} className="bg-orange-600 flex-row gap-2 justify-center items-center py-2 px-4 rounded-lg">
            <Plus size={20} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]">Create Group</Text>
          </Pressable>
         </View>
         <View className="flex-col gap-4">
           {users.map((user) => (
             <View
               key={user.id}
               className="flex-row items-center justify-between bg-white rounded-lg p-3 border border-gray-200 shadow-lg"
             >
               <View>
                 <Text className="font-bold font-[RobotoRegular]">
                   {user.name}
                 </Text>
                 <Text className="text-sm text-slate-500 font-[RobotoRegular]">
                   {user.role}
                 </Text>
               </View>
   
               <Pressable className="bg-orange-600 px-3 py-1 rounded-lg">
                 <Text className="text-white font-bold font-[RobotoRegular]">
                   Message
                 </Text>
               </Pressable>
             </View>
           ))}
         </View>
       </ScrollView>
  )
}

export default GroupScreen