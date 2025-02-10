import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionAnswer() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa || [];
    const [selectedQuestion, setSelectedQuestion] = useState();
    const router=useRouter();
    const OnQuestionSelect = (index) => {
        if (selectedQuestion == index) {
            setSelectedQuestion(null)
        }
        else {
            setSelectedQuestion(index)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <Image
                source={require("./../../assets/images/wave.png")}
                style={styles.backgroundImage}
            />


            <View style={styles.header}>
                <Pressable onPress={()=>router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={styles.title}>Questions & Answers</Text>
                <Text style={styles.subtitle}>{course?.courseTitle}</Text>


                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={qaList}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item, index }) => (
                        <Pressable style={styles.card}
                            onPress={() => OnQuestionSelect(index)}>
                            <Text style={styles.questionText}>{item?.question}</Text>
                            {selectedQuestion == index &&
                                <View style={{
                                    borderTopWidth: 0.4,
                                    marginVertical: 10,
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        fontFamily: 'playfair_display',
                                        fontSize: 16,
                                        color: Colors.PRIMARY,
                                        marginTop: 10
                                    }}>
                                        {item?.answer}
                                    </Text>
                                </View>}
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 800,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    header: {
        width: '100%',
        padding: 20,
        marginTop: 35,
    },
    title: {
        fontFamily: 'playfair-bold',
        fontSize: 28,
        color: Colors.WHITE,
    },
    subtitle: {
        fontFamily: 'playfair_display',
        color: Colors.WHITE,
        fontSize: 20,
        marginBottom: 10, // Space between title and list
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        marginTop: 6,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    questionText: {
        fontFamily: 'playfair-bold',
        fontSize: 20,
        color: Colors.BLACK,
    }
});
