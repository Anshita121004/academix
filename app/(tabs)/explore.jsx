import { ScrollView, Text, View } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { CourseCategory } from "../../constant/Option";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";
import { LinearGradient } from "expo-linear-gradient";

export default function Explore() {
  return (
    <LinearGradient 
      colors={["#6a11cb", "#2575fc"]}  // Same gradient as Home screen
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Explore Courses</Text>

        {CourseCategory.map((item, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item}</Text>
            <CourseListByCategory category={item} />
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontFamily: "playfair-bold",
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white for better contrast
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryTitle: {
    fontFamily: "playfair_display",
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
};
