import DateTimePicker from "@react-native-community/datetimepicker";
import { AlertCircle, Calendar, Users, Wallet } from "lucide-react-native";
import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Input } from "tamagui";

const screenWidth = Dimensions.get("window").width;
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { data: [44, 30, 50, 60, 50, 60], color: () => "#4f46e5" }, // Indigo
  ],
};

export default function ReportsPage() {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartChange = (event: any, selectedDate: any) => {
    if (event.type === "dismissed") {
      setShowStart(false);
      return;
    }

    if (mode === "date") {
      setStartDate(selectedDate);
      setMode("time");
      setShowStart(true);
    } else {
      setStartDate(selectedDate);
      setMode("date");
      setShowStart(false);
    }
  };

  const onEndChange = (event: any, selectedDate: any) => {
    if (event.type === "dismissed") {
      setShowEnd(false);
      return;
    }

    if (mode === "date") {
      setEndDate(selectedDate);
      setMode("time");
      setShowEnd(true);
    } else {
      setEndDate(selectedDate);
      setMode("date");
      setShowEnd(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Filter Bar */}
      <View className="mb-5 w-full flex-row flex-wrap gap-4">
        <View className="min-w-[48%] flex-1">
          <Text className="font-[RobotoRegular] text-base font-bold">
            Start Date
          </Text>
          <Pressable
            onPress={() => {
              setMode("date");
              setShowStart(true);
            }}
          >
            <Input
              readOnly
              className="text-lg font-[RobotoRegular]"
              placeholder="Enter your name"
              value={startDate.toLocaleString()}
            />
          </Pressable>
          {showStart && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={mode}
              is24Hour={true}
              onChange={onStartChange}
            />
          )}
        </View>

        <View className="min-w-[48%] flex-1">
          <Text className="font-[RobotoRegular] text-base font-bold">
            End Date
          </Text>
          <Pressable
            onPress={() => {
              setMode("date");
              setShowEnd(true);
            }}
          >
            <Input
              readOnly
              className="text-lg font-[RobotoRegular]"
              placeholder="Enter your name"
              value={endDate.toLocaleString()}
            />
          </Pressable>
          {showEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={mode}
              is24Hour={true}
              onChange={onEndChange}
            />
          )}
        </View>
      </View>

      {/* Summary Cards */}
      <View className="flex-col flex-wrap items-center justify-between gap-4 mb-6">
        <View className="bg-blue-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center ">
            <Users size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">1,254</Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Total Attendance
          </Text>
        </View>
        <View className="bg-green-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center ">
            <Calendar size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">78%</Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Avg Attendance
          </Text>
        </View>
        <View className="bg-orange-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <Wallet size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">Rp 5,400</Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Fees Collected
          </Text>
        </View>
        <View className="bg-red-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <AlertCircle size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold ">Rp 1,200</Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Outstanding Fees
          </Text>
        </View>
      </View>

      {/* Charts Section (Placeholder Views) */}
      <View className="mb-6">
        <Text className="text-xl font-[BebasNeue] mb-2">Attendance Trend</Text>
        <View className="border border-gray-200 rounded-lg justify-center items-center">
          <BarChart
            data={data}
            width={screenWidth - 32} // padding
            height={300}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `#4f46e5`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginVertical: 4,
              borderRadius: 12,
            }}
            showBarTops
            withHorizontalLabels
          />
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-xl font-[BebasNeue] mb-2">Fee Summary</Text>
        <View className="border border-gray-200 rounded-lg justify-center items-center">
          <BarChart
            data={data}
            width={screenWidth - 32} // padding
            height={300}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `#4f46e5`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 12,
            }}
            showBarTops
            withHorizontalLabels
          />
        </View>
      </View>

      {/* Export Buttons */}
      <View className="flex-row justify-around mt-4">
        <Pressable className="bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-[RobotoRegular] text-lg">
            Export PDF
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
