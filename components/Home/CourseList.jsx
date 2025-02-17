import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CourseList({ courseList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.courseContainer} key={index}>
            <Image
              style={styles.image}
              source={imageAssets[item.banner_image]}
            />
            <Text style={styles.courseText}>{item?.courseTitle}</Text>

            <View style={styles.chapterContainer}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={18}
                color="black"
              />
              <Text style={styles.chapterList}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontFamily: "bold",
    fontSize: 25,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 15,
  },
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 5,
    borderRadius: 15,
    width: 280,
  },
  courseText: {
    fontFamily: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  chapterList: {
    fontFamily: "regular",
  },
  chapterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
});
