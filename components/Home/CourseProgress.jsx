import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

export default function CourseProgress({ courseList }) {
  return (
    <View
      style={{
        marginTop: 5,
      }}
    >
      <Text style={styles.progTitle}>Progress</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.progContainer}>
            <View style={styles.titleContainer}>
              <Image
                source={imageAssets[item?.banner_image]}
                style={styles.image}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text numberOfLines={2} style={styles.progressTitle}>
                  {item?.courseTitle}
                </Text>
                <Text style={styles.progChapter}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Progress.Bar progress={0} width={255} />
              <Text
                style={{
                  fontFamily: "medium",
                  marginTop: 4,
                }}
              >
                2 out of 4 chapters completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  progTitle: {
    fontFamily: "bold",
    fontSize: 25,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  progContainer: {
    margin: 5,
    padding: 12,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    width: 280,
  },
  progressTitle: {
    fontFamily: "bold",
    fontSize: 17,
    flexWrap: "wrap",
  },
  progChapter: {
    fontFamily: "regular",
    fontSize: 15,
  },
});
