import { Image, Text, View } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";

export default function NoCourse() {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../../assets/images/book.png")}
        style={{
          height: 200,
          width: 200,
        }}
      />

      <Text
        style={{
          fontFamily: "playfair-bold",
          fontSize: 25,
          textAlign: "center",
          color: Colors.WHITE
        }}
      >
        Add A Course
      </Text>

      <Button
        text={"+ Create New Course"}
        onPress={() => router.push("/addCourse")}
      />

      <Button text={"Explore Existing Courses"} type="outline" onPress={() => router.push("/explore")} />
    </View>
  );
}