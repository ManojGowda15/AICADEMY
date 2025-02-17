import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { PraticeOption } from "./../../constant/Option";
import Colors from "./../../constant/Colors";
export default function PractiseSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practise</Text>

      <View>
        <FlatList
          data={PraticeOption}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer} key={index}>
              <Image source={item?.image} style={styles.image} />
              <Text style={styles.practiseTitle}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontFamily: "bold",
    fontSize: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 160,
    borderRadius: 15,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  practiseTitle: {
    position: "absolute",
    padding: 15,
    fontFamily: "medium",
    fontSize: 15,
    color: Colors.WHITE,
  },
});
