import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import UserDetailContext from "./../../context/UserDetailContext";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import NoCourse from '../../components/Home/NoCourse';

export default function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const [showNoCourse, setShowNoCourse] = useState(false);

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "playfair-bold",
              fontSize: 35,
              color: Colors.WHITE,
              marginTop: -35,
              marginBottom:10
            }}
          >
            Hello, {userDetail?.name ? userDetail.name : "Guest"}!🤍
          </Text>

          <Text
            style={{
              fontFamily: "playfair_display",
              fontSize: 17,
              color: Colors.WHITE,
              marginBottom: 18
            }}
          >
            Let's Get Started
          </Text>
        </View>

        <TouchableOpacity onPress={() => setShowNoCourse(prev => !prev)}>
          <Ionicons name="add-circle" size={35} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      {showNoCourse && <NoCourse />}
    </View>
  );
}