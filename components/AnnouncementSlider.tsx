import { AppDispatch, RootState } from "@/store";
import { fetchAnnouncement } from "@/store/AnnouncementSlice";
import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import AnnounceMentItem from "./AnnounceMentItem";

const width = Dimensions.get("window").width;

function AnnouncementSlider() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.announcements);

  const COUNT = 1.1;

  React.useEffect(() => {
    dispatch(fetchAnnouncement());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {items?.data && items?.data.length > 0 ? (
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
          data={items?.data}
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
