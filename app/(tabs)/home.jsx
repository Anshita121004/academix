import { Text, View, FlatList, Image, Platform } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Home/Header";
import Colors from "./../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import CourseList from "../../components/Home/CourseList";
import CourseProgress from "../../components/Home/CourseProgress";
import PracticeSection from "../../components/Home/PracticeSection";
import { db } from './../../config/firebaseConfig';
import { collection, query, getDocs, where } from "firebase/firestore";
import UserDetailContext from "../../context/UserDetailContext";

export default function Home() {
  
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail) GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
      data={[]}
      onRefresh={GetCourseList}
      refreshing={loading}
      ListHeaderComponent={
        <LinearGradient 
          colors={["#6a11cb", "#2575fc"]} 
          style={{
            flex: 1,
            paddingBottom: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              padding: 20,
              paddingTop: Platform.OS === "ios" ? 60 : 40,
            }}
          >
            <Header />
            {courseList.length === 0 ? (
              <NoCourse />
            ) : (
              <View>
                <View style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  padding: 15, 
                  borderRadius: 15, 
                  marginBottom: 20, 
                  shadowColor: "#000", 
                  shadowOffset: { width: 0, height: 5 }, 
                  shadowOpacity: 0.2, 
                  shadowRadius: 10, 
                  elevation: 4
                }}>
                  <CourseProgress courseList={courseList} />
                </View>

                <View style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  padding: 15, 
                  borderRadius: 15, 
                  marginBottom: 20, 
                  shadowColor: "#000", 
                  shadowOffset: { width: 0, height: 5 }, 
                  shadowOpacity: 0.2, 
                  shadowRadius: 10, 
                  elevation: 4
                }}>
                  <PracticeSection />
                </View>

                <View style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  padding: 15, 
                  borderRadius: 15, 
                  marginBottom: 20, 
                  shadowColor: "#000", 
                  shadowOffset: { width: 0, height: 5 }, 
                  shadowOpacity: 0.2, 
                  shadowRadius: 10, 
                  elevation: 4
                }}>
                  <CourseList courseList={courseList} />
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      }
    />
  );
}
