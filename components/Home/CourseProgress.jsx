import { FlatList, Image, Text, View } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";
import CourseProgressCard from "../Shared/CourseProgressCard";

export default function CourseProgress({ courseList }) {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "playfair-bold",
          fontSize: 25,
          color: Colors.WHITE,
        }}
      >
        Progress
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
}
