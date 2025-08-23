import announcementApi from "@/lib/apis/announcement";
import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import { fetchTeams } from "@/store/teamsSlice";
import { Announcement } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { CircleX, Edit } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Input, Label, Switch, TextArea } from "tamagui";
import SimpleSelectOption from "./SimpleSelectOption";

interface Props {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const statusData = [
  { id: 85885, name: "active" },
  { id: 89865, name: "archive" },
];

const NewAnnouncement = ({ setVisibleModal }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState("");
  const [teamId, setTeamId] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [isPin, setIsPin] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.teams);

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

  const reset = () => {
    setTitle("");
    setMessage("");
    setTeam("");
    setTeamId("");
    setDate(new Date());
    setStatus("");
    setIsPin(false);
    setIsDateSelected(false);
    setIsTimeSelected(false);
  };

  const handleCreateAnnouncement = async () => {
    try {
      setLoading(true);
      const announcementData = {
        title,
        message,
        teamId,
        date: date.toISOString(),
        status,
        isPinned: isPin,
      } as Announcement;

      const response =
        await announcementApi.createAnnouncement(announcementData);

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.message,
        });
        return;
      }

      reset();
      Toast.show({
        type: "success",
        text1: response.message,
      });
      setVisibleModal(false);
      dispatch(fetchAnnouncement());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDateSelected) {
      showTimepicker();
      setIsTimeSelected(true);
    }
  }, [isDateSelected]);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      const selectedTeam = items?.data.find((item) => item.name === team);
      if (selectedTeam) {
        setTeamId(selectedTeam._id);
      } else {
        setTeamId("");
      }
    }
  }, [team]);

  return (
    <View className="flex-1 justify-center items-center bg-[#00000051] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Pengumuman baru
        </Text>
        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Judul:
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Masukkan judul"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Pesan:
              </Label>
              <TextArea
                className="text-lg font-[RobotoRegular]"
                placeholder="Masukkan pesan"
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <View className="flex-col">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Tanggal:
              </Label>
              <Pressable
                onPress={() => {
                  showDatepicker();
                }}
              >
                <Input
                  readOnly
                  className="text-lg font-[RobotoRegular]"
                  placeholder="Masukkan nama Anda"
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
                Tim
              </Label>
              <SimpleSelectOption
                data={items?.data}
                label="Pilih tim"
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
                Disematkan:
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
            onPress={() => handleCreateAnnouncement()}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Edit size={18} color="#ffffff" />
                <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
                  Membuat
                </Text>
              </>
            )}
          </Pressable>
          <Pressable
            className="bg-red-600 px-3 py-2 rounded-lg mt-5 flex-row gap-1 items-center justify-center"
            onPress={() => setVisibleModal(false)}
          >
            <CircleX size={18} color="#ffffff" />
            <Text className="text-white font-[RobotoRegular]text-base font-bold text-center">
              Menutup
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewAnnouncement;
