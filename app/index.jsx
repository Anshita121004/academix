import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import UserDetailContext from "@/context/UserDetailContext";

export default function Index() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  // ✅ Wrap auth state check inside useEffect to avoid multiple calls
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const result = await getDoc(doc(db, "Users", user?.email));
          if (result.exists()) {
            setUserDetail(result.data());
            router.replace("/(tabs)/home");  // ✅ Redirect only after fetching user details
          } else {
            console.warn("User data not found in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe(); // ✅ Cleanup listener to prevent memory leaks
  }, []); // ✅ Empty dependency array ensures it runs only once

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("./../assets/images/landing.png")}
        style={{ width: "100%", height: 300, marginTop: 70 }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "playfair-bold",
          }}
        >
          Welcome To Academix
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 20,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "playfair_display",
          }}
        >
          Customized Courses, Limitless Growth📚
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/signUp")}>
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.WHITE },
          ]}
          onPress={() => router.push("/auth/signIn")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "playfair-bold",
  },
});
