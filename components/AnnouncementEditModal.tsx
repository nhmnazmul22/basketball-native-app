import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Input, Label, Switch, TextArea } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";
import { Announcement } from "@/types";

interface Props {
  item: Announcement;
  setVisibleEditModal: Dispatch<SetStateAction<boolean>>;
}

const teamData = [
  { id: 18254, name: "U12" },
  { id: 55288, name: "U15" },
  { id: 98566, name: "U30" },
  { id: 86868, name: "U40" },
];

const statusData = [
  { id: 85885, name: "Active" },
  { id: 89865, name: "Archive" },
];

const AnnouncementEditModal = ({ item, setVisibleEditModal }: Props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [isPin, setIsPin] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setMessage(item.message || "");
      setDate(item.date ? new Date(item.date) : new Date());
      setTeam(item.teamDetails.name || "");
      setStatus(item.status || "");
      setIsPin(item.isPinned || false);
    }
  }, [item]);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (mode === "date") {
      setDate(selectedDate || date);
      setMode("time");
      setShow(true);
    } else {
      setDate(selectedDate || date);
      setShow(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#00000070] px-4">
      <View className="w-full max-h-[85%] bg-white p-5 rounded-2xl shadow-lg">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
            Update Announcement
          </Text>

          <View className="mt-5 flex-col space-y-4">
            {/* Title */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Title
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Message */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Message
              </Label>
              <TextArea
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter message"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Date */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Date
              </Label>
              <Pressable
                onPress={() => {
                  setMode("date");
                  setShow(true);
                }}
              >
                <Input
                  readOnly
                  className="text-lg font-[RobotoRegular]"
                  value={date.toLocaleString()}
                />
              </Pressable>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  is24Hour
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            {/* Team */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Team
              </Label>
              <SimpleSelectOption
                data={teamData}
                label="Choose the team"
                value={team}
                setValue={setTeam}
              />
            </View>

            {/* Status */}
            <View>
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Status
              </Label>
              <SimpleSelectOption
                data={statusData}
                label="Choose status"
                value={status}
                setValue={setStatus}
              />
            </View>

            {/* Pin */}
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-[RobotoRegular]">Pinned:</Text>
              <Switch
                unstyled
                size="$2"
                checked={isPin}
                onCheckedChange={() => setIsPin(!isPin)}
                native
              >
                <Switch.Thumb unstyled animation="bouncy" />
              </Switch>
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View className="flex-row gap-4 justify-end mt-6">
          <Pressable
            className="bg-orange-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => {
              // Example save callback
              const updated = { title, message, date, team, status, isPin };
              console.log("Updated announcement:", updated);
              setVisibleEditModal(false);
            }}
          >
            <Edit size={18} color="#fff" />
            <Text className="text-white font-[RobotoRegular] text-base font-bold">
              Update
            </Text>
          </Pressable>

          <Pressable
            className="bg-red-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => setVisibleEditModal(false)}
          >
            <CircleX size={18} color="#fff" />
            <Text className="text-white font-[RobotoRegular] text-base font-bold">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementEditModal;
