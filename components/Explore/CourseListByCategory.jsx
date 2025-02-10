import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from "./../../config/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { imageAssets } from "./../../constant/Option";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function CourseListByCategory({ category }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // FIX: router instance

  useEffect(() => {
    if (category) GetCourseListByCategory();
  }, [category]);

  const GetCourseListByCategory = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Courses"),
        where('category', '==', category),
        orderBy('createdOn', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // FIX: Collect in array
      setCourseList(courses); // FIX: Set state only once
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  return (
    <View>
      {loading ? <Text>Loading...</Text> : null}

      {courseList.length === 0 && !loading ? (
        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'playfair_display' }}>No Courses Available</Text>
      ) : (
        <FlatList
          data={courseList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/courseView/" + item?.id, // FIX: Use id
                params: { courseParams: JSON.stringify(item) }
              })}
              style={styles.courseContainer}
            >
              <Image
                source={imageAssets[item.banner_image]}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle}>{item?.courseTitle}</Text>

              <View style={styles.courseDetails}>
                <Ionicons name="book-outline" size={20} color="black" />
                <Text style={{ fontFamily: "playfair_display" }}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 260,
  },
  courseImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  courseTitle: {
    fontFamily: "playfair-bold",
    fontSize: 18,
    marginTop: 10,
  },
  courseDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  }
}); 