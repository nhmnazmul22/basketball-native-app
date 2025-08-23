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
  { id: 85885, name: "active" },
  { id: 89865, name: "archive" },
];

const AnnouncementEditModal = ({ item, setVisibleEditModal }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState("");
  const [teamId, setTeamId] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [isPin, setIsPin] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.teams);

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

  const handleUpdateAnnouncement = async () => {
    try {
      setLoading(true);

      if (!item._id || !teamId) {
        Toast.show({
          type: "error",
          text1: "Announcement ID or Team ID not found",
        });
        return;
      }

      const announcementData = {
        title,
        message,
        teamId: teamId,
        date: date.toISOString(),
        status,
        isPinned: isPin,
      } as Announcement;

      console.log(announcementData);

      const response = await announcementApi.updateAnnouncement(
        item._id,
        announcementData
      );

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: response.message,
      });
      setVisibleEditModal(false);
      dispatch(fetchAnnouncement());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setMessage(item.message || "");
      setDate(item.date ? new Date(item.date) : new Date());
      setTeam(item.teamDetails.name || "");
      setStatus(item.status || "");
      setIsPin(item.isPinned || false);
      setTeamId(item.teamId || "");
    }
  }, [item]);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (team && items?.data) {
      const selectedTeam = items.data.find((item) => item.name === team);
      if (selectedTeam) {
        setTeamId(selectedTeam._id);
      } else {
        setTeamId("");
      }
    }
  }, [team, items]);

  return (
    <View className="flex-1 justify-center items-center bg-[#00000070] py-16">
      <View className="w-[90%] bg-white p-5 rounded-lg">
        <Text className="text-center text-2xl font-bold font-[BebasNeue] text-orange-600">
          Perbarui pengumuman
        </Text>

        <View className="mt-5 flex flex-col gap-2">
          <View className="flex-col gap-2">
            {/* Title */}
            <View className="flex-col gap-1">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Judul
              </Label>
              <Input
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Message */}
            <View className="flex-col gap-1">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Pesan
              </Label>
              <TextArea
                className="text-lg font-[RobotoRegular]"
                placeholder="Enter message"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Date */}
            <View className="flex-col gap-1">
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
            <View className="flex-col gap-1">
              <Label
                unstyled
                className="text-xl font-bold font-[RobotoRegular]"
              >
                Tim
              </Label>
              <SimpleSelectOption
                data={items?.data}
                label="Choose the team"
                value={team}
                setValue={setTeam}
              />
            </View>

            {/* Status */}
            <View className="flex-col gap-1">
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
        </View>

        {/* Actions */}
        <View className="flex-row gap-4 justify-end mt-6">
          <Pressable
            className="bg-orange-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => handleUpdateAnnouncement()}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <Edit size={18} color="#ffffff" />
                <Text className="text-white font-[RobotoRegular] text-base font-bold">
                  Update
                </Text>
              </>
            )}
          </Pressable>

          <Pressable
            className="bg-red-600 flex-row gap-2 px-5 py-2 rounded-lg items-center"
            onPress={() => setVisibleEditModal(false)}
          >
            <CircleX size={18} color="#ffffff" />
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
