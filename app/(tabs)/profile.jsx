import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext } from "react";
import UserDetailContext from "./../../context/UserDetailContext";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc"]} // Purple to Blue Gradient
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 3,
          borderColor: Colors.PRIMARY,
          marginBottom: 20,
        }}
      />

      {/* User Info */}
      <Text
        style={{
          fontFamily: "playfair-bold",
          fontSize: 36,
          color: Colors.WHITE,
          textAlign: "center",
        }}
      >
        {userDetail?.name ? userDetail.name : "Guest"}
      </Text>
      <Text
        style={{
          fontFamily: "playfair_display",
          fontSize: 20,
          color: Colors.WHITE,
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {userDetail?.email || "guest@example.com"}
      </Text>

      
    </LinearGradient>
  );
}