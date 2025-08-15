import React, { useState } from "react";
import {
  Dimensions,
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
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        scrollEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className={`my-2 ${item.me ? "items-end" : "items-start"}`}>
            <View
              className={`px-4 py-2 rounded-xl max-w-[70%] ${
                item.me ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text className={item.me ? "text-white" : "text-black"}>
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

      <View className="flex-row items-center border-t border-slate-200 p-2 bg-white">
        <TextInput
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          className="flex-1 border border-slate-300 rounded-full px-4 py-2 mr-2"
        />
        <Pressable
          onPress={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-full"
        >
          <Text className="text-white font-bold">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
