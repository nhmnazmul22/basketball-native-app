import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", me: false },
    { id: 2, text: "Hi, how are you?", me: true },
    { id: 3, text: "I’m good, thanks!", me: false },
  ]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: newMessage, me: true },
    ]);
    setNewMessage("");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={"padding"}
      keyboardVerticalOffset={120}
    >
      <FlatList
        data={messages}
        scrollEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`my-2 ${item.me ? "items-end" : "items-start"} font-[RobotoRegular]`}
          >
            <View
              className={`px-4 py-2 rounded-xl max-w-[70%] font-[RobotoRegular] ${
                item.me ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text
                className={`${item.me ? "text-white" : "text-black"} font-[RobotoRegular]`}
              >
                {item.text}
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
