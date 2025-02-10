import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PracticeOption } from "../../constant/Option"; // Corrected import
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export default function PracticeSection() {
  const router = useRouter();
  return (
    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
      <Text style={{ fontFamily: "playfair-bold", fontSize: 25, color: Colors.WHITE }}>
        Practice
      </Text>

      <FlatList
        data={PracticeOption}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>router.push('/practice/'+ item.name )} key={index}
            style={{
              flex: 1,
              margin: 4,
              aspectRatio: 1
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: "100%", 
                borderRadius: 15
              }}
            />
            <Text
              style={{
                paddingVertical: 10,
                position:'absolute',
                fontFamily: "playfair-bold",
                fontSize: 14,
                color: Colors.WHITE,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
