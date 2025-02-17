import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NoCourse />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Platform.OS == "ios" && 45,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
