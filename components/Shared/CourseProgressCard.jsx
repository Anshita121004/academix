import { FlatList, Image, Text, View } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

export default function CourseProgressCard({ item }) {
  const GetCompletedChapters = (course) => {
    if (!course?.chapters || course?.chapters.length === 0) return 0;
    const completedChapter = course?.completedChapter?.length || 0;
    return completedChapter / course?.chapters?.length;
  };

  return (
    <View
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        width: 280,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        {/* Ensure the correct image is displayed */}
        <Image
          source={imageAssets[item?.banner_image]}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
          }}
        />

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "playfair-bold",
              fontSize: 19,
              flexWrap: "wrap",
            }}
          >
            {item?.courseTitle || "Untitled Course"}
          </Text>
          <Text
            style={{
              fontFamily: "playfair_display",
              fontSize: 15,
            }}
          >
            {item?.chapters?.length ?? 0} Chapters
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Progress.Bar
          progress={GetCompletedChapters(item)}
          width={250}
          color={Colors.PRIMARY}
        />
        <Text
          style={{
            fontFamily: "playfair_display",
            marginTop: 2,
          }}
        >
          {item?.completedChapter?.length ?? 0} Out of{" "}
          {item?.chapters?.length ?? 0} Chapters Completed
        </Text>
      </View>
    </View>
  );
}
