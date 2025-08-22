import { BASE_URL } from "@/config";
import { formatCurrency } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { fetchReports } from "@/store/ReportSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  AlertCircle,
  Banknote,
  Calendar,
  ChartBar,
  ChartBarDecreasing,
  Wallet,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "tamagui";

const screenWidth = Dimensions.get("window").width;

export default function ReportsPage() {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [mode, setMode] = useState<any>("date");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d;
  });
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.report);

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

  const downloadReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/generate-pdf-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch PDF");

      // Convert response to blob
      const blob = await response.blob();

      // Convert blob → base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        //@ts-ignore
        const base64data = reader?.result?.split(",")[1];

        // Save to local file
        const fileUri = FileSystem.documentDirectory + "report.pdf";
        await FileSystem.writeAsStringAsync(fileUri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("✅ PDF saved to:", fileUri);

        // Open share dialog
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          alert("Sharing not available on this device");
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("❌ Download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(fetchReports({ startDate, endDate }));
    }
  }, [startDate, endDate]);

  const summary = items?.data.summary;

  const AttendanceData: any = {
    labels: [],
    datasets: [
      { data: [], color: () => "#4f46e5" }, // Indigo
    ],
  };
  const IncomeData: any = {
    labels: [],
    datasets: [
      { data: [], color: () => "#4f46e5" }, // Indigo
    ],
  };

  if (items?.data.attendanceGraph) {
    Object.keys(items.data.attendanceGraph).forEach((key) => {
      AttendanceData.labels.push(key[0].toUpperCase() + key.slice(1));
    });

    Object.values(items.data.attendanceGraph).forEach((value) => {
      AttendanceData.datasets[0].data.push(value);
    });
  }

  if (items?.data.incomeGraph) {
    Object.keys(items.data.incomeGraph).forEach((key) => {
      IncomeData.labels.push(key[0].toUpperCase() + key.slice(1));
    });

    Object.values(items.data.incomeGraph).forEach((value) => {
      IncomeData.datasets[0].data.push(value);
    });
  }

  return (
    <ScrollView
      className="flex-1 bg-white p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Filter Bar */}
      <View className="mb-5 w-full flex-row flex-wrap gap-4">
        <View className="min-w-[48%] flex-1">
          <Text className="font-[RobotoRegular] text-base font-bold">
           Tanggal mulai
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
           Tanggal akhir
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
      <View className="flex-row flex-wrap items-center justify-between gap-4 mb-6">
        <View className="bg-orange-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center ">
            <Calendar size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">
              {summary?.averageAttendance}%
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Kehadiran rata -rata
          </Text>
        </View>
        <View className="bg-green-600 w-full p-4 rounded-xl">
          <View className="flex-row gap-3 items-center ">
            <Wallet size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">
              {summary?.netIncome}
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
           Pendapatan bersih
          </Text>
        </View>
        <View className="bg-blue-600 w-[48%] p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <ChartBar size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">
              {formatCurrency(summary?.paymentPaid)}
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Total pendapatan
          </Text>
        </View>
        <View className="bg-red-600 w-[48%] p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <ChartBarDecreasing size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold ">
              {formatCurrency(summary?.paymentPending)}
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Total biaya
          </Text>
        </View>
        <View className="bg-orange-600 w-[48%] p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <Banknote size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold">
              {formatCurrency(summary?.paymentPaid)}
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Biaya dikumpulkan
          </Text>
        </View>
        <View className="bg-amber-600 w-[48%] p-4 rounded-xl">
          <View className="flex-row gap-3 items-center">
            <AlertCircle size={24} color="#fff" />
            <Text className="text-white text-2xl font-bold ">
              {formatCurrency(summary?.paymentPending)}
            </Text>
          </View>
          <Text className="text-white font-[RobotoRegular] mt-1">
            Biaya yang tertunda
          </Text>
        </View>
      </View>

      {/* Charts Section (Placeholder Views) */}
      <View className="mb-6">
        <Text className="text-xl font-[BebasNeue] mb-2">Tren kehadiran</Text>
        <View className="border border-gray-200 rounded-lg justify-center items-center">
          <BarChart
            data={AttendanceData}
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
        <Text className="text-xl font-[BebasNeue] mb-2">Ringkasan Biaya</Text>
        <View className="border border-gray-200 rounded-lg justify-center items-center">
          <BarChart
            data={IncomeData}
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
        <Pressable
          className="bg-blue-600 px-6 py-3 rounded-xl"
          onPress={downloadReport}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-[RobotoRegular] text-lg">
              Export PDF
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
