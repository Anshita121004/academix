import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient"; // For background gradient
import { db } from './../../config/firebaseConfig';
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import UserDetailContext from "../../context/UserDetailContext";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";

export default function Progress() {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (userDetail) {
      GetCourseList();
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email),
      orderBy('createdOn', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const fetchedCourses = [];
    querySnapshot.forEach((doc) => {
      fetchedCourses.push({ id: doc.id, ...doc.data() });
    });

    setCourseList(fetchedCourses);
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#6A11CB", "#2575FC"]} style={{ flex: 1 }}>
      {/* Background Image */}
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: 900,
          opacity: 0.1, // Lighten the background effect
        }}
      />

      {/* Course Progress List */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 15,
            fontFamily: "playfair-bold",
          }}
        >
          Course Progress
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={courseList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <CourseProgressCard item={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No courses found.</Text>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white for a glassmorphism effect
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
};

const style={
   fontFamily: 'playfair-bold'
}