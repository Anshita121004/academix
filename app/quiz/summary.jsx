import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';

export default function QuizSummary() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult= JSON.parse(quizResultParam);
    const [correctAns, setCorrectAns]=useState(0);
    const [totalQues, setTotalQues]=useState(0);
    const router=useRouter()

    useEffect(()=>{
        console.log(quizResult);
        quizResult && CalculateResult();
    }, [quizResult])

    const CalculateResult=()=>{
        if(quizResult!==undefined){
            const correctAns_= Object.entries(quizResult)
            ?.filter(([key, value])=>
            value?.isCorrect==true)
            console.log(correctAns);
         const totalQues_= Object.keys(quizResult).length;

         setCorrectAns(correctAns_.length);
         setTotalQues(totalQues_);

        }
    }
    const GetPercMark=()=>{
        return ((correctAns/totalQues)*100).toFixed(0)
    }

    return (
        <FlatList
        ListHeaderComponent={
        <View>
            <Image
                source={require("./../../assets/images/wave.png")}
                style={{
                    height: 600,
                    width: "100%",
                }}
            />
            <View
                style={{
                    position: "absolute",
                    padding: 35,
                    width: "100%",
                }}
            >
                <Text style={{
                    textAlign:'center',
                    fontFamily: 'playfair-bold',
                    fontSize: 30,
                    color: Colors.WHITE
                }}>Quiz Summary</Text>
                <View style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 30,
                    display: 'flex',
                    alignItems: 'center'
                }}>
                     <Image
                source={require("./../../assets/images/trophy.png")}
                style={{
                    height: 100,
                    width: 100,
                    marginTop:-50
                }}/>
                    <Text style={{textAlign:'center',
                    fontFamily: 'playfair-bold',  fontSize: 20}} >
                            {GetPercMark()>60?"Congratulations!":"Try Again!"}
                        </Text>
                        <Text style={{textAlign:'center',
                    fontFamily: 'playfair_display',  fontSize: 15, color: Colors.GRAY}}>
                            Your Gave {GetPercMark()}% Correct Answers!</Text>

                            <View style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
}}>
    <View style={styles.resultTextContainer}>
        <Text style={styles.resultText}>📋{totalQues}</Text> 
    </View>
    <View style={styles.resultTextContainer}>
        <Text style={styles.resultText}>✅{correctAns}</Text>
    </View>
    <View style={styles.resultTextContainer}>
        <Text style={styles.resultText}>❌{totalQues - correctAns}</Text>
    </View>
</View>

                </View>
                <Button text={"Back To Home"} onPress={()=>router.replace('/(tabs)/home')}/>
                <View style={{
                    marginTop: 10,
                    flex: 1
                }}>
                    <Text style={{
                        fontFamily:  'playfair-bold',
                        fontSize: 28,
                        textAlign: 'center'
                    }}>Summary</Text>
                    <Text style={{
                        fontFamily:  'playfair_display',
                        color: Colors.GRAY,
                        fontSize: 18
                    }}>Review your answers below to see where you did great and what you can improve next time! </Text>
                </View>
            </View>
        </View>
        }
        data={Object.entries(quizResult)}
        renderItem={({item, index})=>{
            const quizItem= item[1];
            return (
            <View style={{
                padding: 15,
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 15,
                backgroundColor: quizItem?.isCorrect==true?Colors.LIGHT_GREEN: Colors.LIGHT_RED,
                borderColor: quizItem?.isCorrect==true?Colors.LIGHT_GREEN: Colors.RED
            }}>
                <Text style={{
                    fontFamily: 'playfair_display',
                    fontSize:20
                }}>{quizItem.question}</Text>
                <Text style={{
                    fontFamily:'playfair_display',
                    fontSize: 15
                }}>
                    Answer: {quizItem?.correctAns}
                </Text>
            </View>)
        }}
        keyExtractor={(item, index) => index.toString()}
        />
    )
}

const styles= StyleSheet.create({
    resultTextContainer:{
        padding:15,
        backgroundColor: Colors.WHITE,
        elevation: 1
    },
    resultText:{
        fontFamily:'playfair_display',
        fontSize: 20
    }
})
