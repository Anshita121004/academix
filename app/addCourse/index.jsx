import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import { db } from "./../../config/firebaseConfig";
import UserDetailContext from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const { userDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const router = useRouter();

  const onGenerateTopic = async () => {
    if (!userInput.trim()) {
      alert("Please enter a course idea before generating topics.");
      return;
    }

    setLoading(true);
    try {
      const PROMPT = userInput + Prompt.IDEA;
      const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResp.response.text());
      setTopics(topicIdea?.course_titles || []);
    } catch (error) {
      console.error("Error generating topics:", error);
      alert("Failed to generate topics. Try again.");
    }
    setLoading(false);
  };

  const onTopicSelect = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const isTopicSelected = (topic) => selectedTopics.includes(topic);

  const onGenerateCourse = async () => {
    if (!userDetail || !userDetail.email) {
      alert("User details not found! Please log in again.");
      return;
    }

    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }

    setLoading(true);
    const PROMPT = selectedTopics.join(", ") + Prompt.COURSE;

    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(aiResp.response.text());
      const courses = resp.courses || [];

      if (courses.length === 0) {
        alert("No courses generated. Try again with different topics.");
        setLoading(false);
        return;
      }

      // Save all courses in Firestore
      await Promise.all(
        courses.map(async (course) => {
          const docId = Date.now().toString();
          await setDoc(doc(db, "Courses", docId), {
            ...course,
            createdOn: new Date().toISOString(),
            createdBy: userDetail.email,
            docId: docId,
          });
        })
      );

      alert("Course successfully created!");
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error generating course:", error);
      alert("Failed to generate course. Try again.");
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create New Course</Text>
      <Text style={styles.subHeader}>What do you want to learn today?</Text>

      <Text style={styles.description}>
        Write what course you want to create (Ex. Learn React Js, Digital
        Marketing Guide, 10th Science Chapter)
      </Text>

      <TextInput
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        value={userInput}
        onChangeText={setUserInput}
      />

      <Button text="Generate Topic" onPress={onGenerateTopic} loading={loading} />

      <View style={styles.topicContainer}>
        <Text style={styles.topicHeader}>
          Select all topics you want to add to the course
        </Text>

        <View style={styles.topicList}>
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={[
                  styles.topicItem,
                  isTopicSelected(item) && styles.selectedTopic,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectedTopics.length > 0 && (
        <View style={styles.generateCourseContainer}>
          <Button text="Generate Course" onPress={onGenerateCourse} loading={loading} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  header: {
    fontFamily: "playfair-bold",
    fontSize: 30,
  },
  subHeader: {
    fontFamily: "playfair_display",
    fontSize: 30,
  },
  description: {
    fontFamily: "playfair_display",
    fontSize: 18,
    marginTop: 8,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 14,
  },
  topicContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  topicHeader: {
    fontFamily: "playfair_display",
    fontSize: 18,
  },
  topicList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  topicItem: {
    padding: 7,
    borderWidth: 0.4,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: Colors.PRIMARY,
  },
  selectedTopic: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },
  generateCourseContainer: {
    marginBottom: 40,
  },
});   