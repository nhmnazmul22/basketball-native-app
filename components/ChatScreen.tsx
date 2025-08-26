import { useAuth } from "@/context/AuthContext";
import { useGroup } from "@/context/GroupContext";
import { AppDispatch, RootState } from "@/store";
import { fetchMessages } from "@/store/messagesSlice";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import TableError from "./TableError";
import TableLoading from "./TableLoading";

interface MessageObj {
  _id: any;
  senderId: string;
  groupId: string;
  message: string;
  me: boolean;
}



const ChatScreen = () => {
  const { groupId } = useGroup();
  const { session } = useAuth();
  const [socket, setSocket] = useState<any>(null);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.message
  );

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageObj = {
      senderId: session.user_id,
      groupId,
      message: newMessage,
      me: true,
    };

    // Emit only
    socket.emit("group message", messageObj);

    setNewMessage("");
  };

  useEffect(() => {
    const socket = io("http://192.168.1.110:3001", {
     transports: ["websocket"], // Important for RN
     });
     setSocket(socket)

    // socket connection logs
    socket.on("connect", () => {
      console.log("Connected to backend socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from backend socket");
    });

    // listen for incoming messages
    socket.on("group message", (messageObj) => {
      setMessages((prev) => [
        ...prev,
        {_id: Date.now(), ...messageObj },
      ]);
    });

    return () => {
      socket.off("group message"); // cleanup listener
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchMessages(groupId));
    }
  }, [groupId]);

  // merge redux fetched messages with socket messages
  const allMessages =
    items?.data && items.data.length > 0
      ? [...items.data, ...messages]
      : messages;

  if (loading) {
    return <TableLoading />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={"padding"}
      keyboardVerticalOffset={120}
    >
      <FlatList
        data={allMessages}
        scrollEnabled
        keyExtractor={(item) => `${item._id}-${item.senderId}`}
        renderItem={({ item }) => (
          <View
            className={`my-2 ${
              item.senderId === session.user_id
                ? "items-end"
                : "items-start"
            } font-[RobotoRegular]`}
          >
           
            <View
              className={`px-4 py-2 rounded-xl max-w-[70%] font-[RobotoRegular] ${
                item.senderId === session.user_id
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            >
              <Text
                className={`${
                  item.senderId === session.user_id
                    ? "text-white"
                    : "text-black"
                } font-[RobotoRegular]`}
              >
                {item.message}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{
          padding: 12,
          paddingBottom: 80,
        }}
      />

      <View className="flex-row items-center mb-5 border-t border-slate-200 p-2 bg-white">
        <TextInput
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          className="flex-1 border border-slate-300 rounded-full px-4 py-2 mr-2 font-[RobotoRegular]"
        />
        <Pressable
          onPress={sendMessage}
          className="bg-orange-600 px-4 py-2 rounded-full"
        >
          <Text className="text-white font-bold font-[RobotoRegular]">
            Send
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
