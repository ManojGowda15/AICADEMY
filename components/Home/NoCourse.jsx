import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

const NoCourse = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgStyle}
        source={require("./../../assets/images/book.png")}
      />

      <Text style={styles.descTitle}>You don't have any course</Text>

      <Button
        text={"+ Create New Course"}
        onPress={() => router.push("/AddCourse")}
      />
      <Button text={"Explore Existing Courses"} type="outline" />
    </View>
  );
};

export default NoCourse;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
  },
  imgStyle: {
    height: 280,
    width: 250,
  },
  descTitle: {
    fontFamily: "bold",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
});
