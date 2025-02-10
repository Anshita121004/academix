import { View, Text, Image, Pressable, Dimensions, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import FlipCard from 'react-native-flip-card';

export default function Flashcards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const [currentPage, setCurrentPage] = useState(0);
  const flashcard = course?.flashcards || [];
  const { width } = Dimensions.get('screen');
  const router = useRouter();

  // Corrected pagination logic
  const onMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.pageCounter}>
            {currentPage + 1} of {flashcard.length}
          </Text>
        </View>

        <FlatList
          data={flashcard}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          onMomentumScrollEnd={onMomentumScrollEnd}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.cardContainer}>
              <FlipCard style={styles.flipCard}>
                {/* Front Side */}
                <View style={styles.frontCard}>
                  <Text style={styles.cardText}>{item?.front}</Text>
                </View>
                {/* Back Side */}
                <View style={styles.backCard}>
                  <Text style={styles.backCardText}>{item?.back}</Text>
                </View>
              </FlipCard>
            </View>
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
  container: {
    position: 'absolute',
    padding: 25,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  pageCounter: {
    fontFamily: "playfair-bold",
    fontSize: 25,
    color: Colors.WHITE,
  },
  cardContainer: {
    width: Dimensions.get('screen').width, // Ensures full width for each item
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  flipCard: {
    width: Dimensions.get('screen').width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  frontCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
  },
  backCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  cardText: {
    fontFamily: 'playfair-bold',
    fontSize: 28,
    textAlign: 'center',
  },
  backCardText: {
    fontFamily: 'playfair-bold',
    fontSize: 28,
    padding: 20,
    width: Dimensions.get('screen').width * 0.78,
    textAlign: 'center',
    color: Colors.WHITE,
  },
});

