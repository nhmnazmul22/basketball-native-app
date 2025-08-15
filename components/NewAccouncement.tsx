import DateTimePicker from "@react-native-community/datetimepicker";
import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Input, Label, Switch, TextArea } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";

interface Props {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const teamData = [
  { id: 18254, name: "U12" },
  { id: 55288, name: "U15" },
  { id: 98566, name: "U30" },
  { id: 86868, name: "U30" },
];

const statusData = [
  { id: 85885, name: "Active" },
  { id: 89865, name: "Archive" },
];

const NewAnnouncement = ({ setVisibleModal }: Props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [isPin, setIsPin] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (mode === "date") {
      // User picked a date, now open time picker
      setDate(selectedDate || date);
      setMode("time");
      setShow(true);
    } else if (mode === "time") {
      // User picked a time, now close picker
      setDate(selectedDate || date);
      setShow(false);
    }
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };
  const showTimepicker = () => {
    showMode("time");
  };

  useEffect(() => {
    if (isDateSelected) {
      showTimepicker();
      setIsTimeSelected(true);
    }
  }, [isDateSelected]);

  return (
    <View className="flex-1 justify-center items-center bg-[#00000051] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Announcement Update
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Title:
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Message:
              </Label>
              <TextArea
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter message"
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Date:
              </Label>
              <Pressable
                onPress={() => {
                  showDatepicker();
                }}
              >
                <Input
                  readOnly
                  className="text-lg font-[RobotoRegular]"
                  placeholder="Enter your name"
                  value={date.toLocaleString()}
                />
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="datePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View className="flex-col">
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
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Status:
              </Label>
              <SimpleSelectOption
                data={statusData}
                label="Choose the role"
                value={status}
                setValue={setStatus}
              />
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-lg font-normal font-[RobotoRegular]">
                Pinned:
              </Text>
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
        </View>

        <View className="flex-row gap-5 justify-end items-center">
          <Pressable
            className="bg-orange-600  px-3 py-2 rounded-lg mt-5 flex-row gap-2 items-center justify-center"
            onPress={() => {}}
          >
            <Edit size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Create
            </Text>
          </Pressable>
          <Pressable
            className="bg-red-600 px-3 py-2 rounded-lg mt-5 flex-row gap-1 items-center justify-center"
            onPress={() => setVisibleModal(false)}
          >
            <CircleX size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewAnnouncement;
