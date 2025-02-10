import { View, Text, Image, Pressable, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button from "./../../components/Shared/Button";
import { db } from "./../../config/firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';

const Quiz = () => {
    const router = useRouter();
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const quiz = course?.quiz;
    const [selectedOption, setSelectedOption] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetProgress = (currentPage) => {
        const perc = currentPage / quiz?.length;
        return perc;
    };

    const OnOptionSelect = (selectedChoice) => {
        setResult(prev => ({
            ...prev,
            [currentPage]: {
                userChoice: selectedChoice,
                isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
                question: quiz[currentPage]?.question,
                correctAns: quiz[currentPage]?.correctAns
            }
        }));
    };

    const onQuizFinish = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, "Courses", course?.docId), {
                quizResult: result
            });
            setLoading(false);
            router.replace({
                pathname: '/quiz/summary',
                params:{
                    quizResultParam: JSON.stringify(result)
                }
            })
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <View>
            <Image
                source={require("./../../assets/images/wave.png")}
                style={{
                    height: 800,
                    width: "100%",
                }}
            />
            <View
                style={{
                    position: "absolute",
                    padding: 25,
                    width: "100%",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Pressable>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text
                        style={{
                            fontFamily: "playfair-bold",
                            fontSize: 25,
                            color: Colors.WHITE,
                        }}
                    >
                        {currentPage + 1} of {quiz.length}  
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Progress.Bar
                        progress={GetProgress(currentPage)}
                        width={Dimensions.get("window").width * 0.85}
                        color={Colors.WHITE}
                        height={8}
                    />
                </View>

                <View
                    style={{
                        padding: 20,
                        backgroundColor: Colors.WHITE,
                        marginTop: 30,
                        height: Dimensions.get("screen").height * 0.65,
                        elevation: 1,
                        borderRadius: 20,
                    }}
                >
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: "playfair-bold",
                                textAlign: "center",
                            }}
                        >
                            {quiz[currentPage]?.question}
                        </Text>

                        {quiz[currentPage]?.options.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedOption(index);
                                    OnOptionSelect(item);
                                }}
                                key={index}
                                style={{
                                    padding: 20,
                                    borderWidth: 0.3,
                                    borderRadius: 15,
                                    marginTop: 8,
                                    borderColor: selectedOption == index ? Colors.GREEN : null,
                                    backgroundColor: selectedOption == index ? Colors.LIGHT_GREEN : null,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "playfair_display",
                                        fontSize: 20,
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {(selectedOption?.toString() && quiz.length - 1 > currentPage) && (
                    <Button
                        text="Next"
                        onPress={() => {
                            setCurrentPage(currentPage + 1);
                            setSelectedOption(null);
                        }}
                    />
                )}

                {(selectedOption?.toString() && quiz.length - 1 == currentPage) && (
                    <Button text="Finish" loading={loading} onPress={() => onQuizFinish()} />
                )}
            </View>
        </View>
    );
}

export default Quiz;
