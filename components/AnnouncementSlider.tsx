import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AnnounceMentItem from "./AnnounceMentItem";

const announcementData = [
  {
    Aid: "ANN001",
    title: "Training Session Reminder",
    message:
      "U15 team training tomorrow at 5:00 PM, Court 2. Bring your own water bottle.",
    team: "U15",
    date: "2025-08-12",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
  {
    Aid: "ANN002",
    title: "Battle Match Announcement",
    message:
      "U12 vs U15 friendly match scheduled for August 20 at 4:00 PM, Main Court.",
    team: "All Teams",
    date: "2025-08-10",
    createdBy: "Admin",
    isPin: true,
    status: "Active",
  },
  {
    Aid: "ANN003",
    title: "Payment Reminder",
    message:
      "August membership fee is due by August 15. Please pay via the app or to your coach.",
    team: "All Students",
    date: "2025-08-09",
    createdBy: "Coach Liam",
    isPin: false,
    status: "Active",
  },
  {
    Aid: "ANN004",
    title: "Holiday Notice",
    message: "No training on August 25 due to facility maintenance.",
    team: "All Teams",
    date: "2025-08-08",
    createdBy: "Admin",
    isPin: false,
    status: "Archived",
  },
];
const width = Dimensions.get("window").width;

function AnnouncementSlider() {
  const COUNT = 1.1;

  return (
    <View style={{ flex: 1 }}>
      {announcementData && announcementData.length > 0 ? (
        <Carousel
          loop
          autoPlay
          autoPlayInterval={2500}
          vertical={false}
          width={width / COUNT}
          height={400}
          style={{
            width: width,
          }}
          data={announcementData}
          renderItem={({ item, index }) => (
            <View className="p-3">
              <AnnounceMentItem item={item} />
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Nunito",
            fontSize: 16,
            fontStyle: "italic",
            color: "#000000",
            width: width * 0.9,
          }}
        >
          No Data Found
        </Text>
      )}
    </View>
  );
}

export default AnnouncementSlider;
