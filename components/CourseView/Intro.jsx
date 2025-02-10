import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

export default function Intro({ course }) {
  const router = useRouter();

  return (
    <View>
      <Image
        source={course?.banner_image ? imageAssets[course.banner_image] : imageAssets['banner6.png']}
        style={{
          width: "100%",
          height: 280,
        }}
      />

      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "playfair-bold",
            fontSize: 25,
          }}
        >
          {course?.courseTitle}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={20} color="black" />

          <Text
            style={{
              fontFamily: "playfair_display",
              fontSize: 18,
            }}
          >
            {course?.chapters?.length} Chapters
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "playfair_display",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "playfair_display",
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>

        <Button text={"Start Now"} onPress={() => console.log("")} />
      </View>

      <Pressable
        style={{
          position: "absolute",
          padding: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={34} color="black" />
      </Pressable>
    </View>
  );
}