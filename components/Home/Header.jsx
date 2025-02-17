import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { AntDesign } from "@expo/vector-icons";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>Hello, {userDetail?.name}</Text>
        <Text style={styles.text2}>Let's Get Started</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name="setting" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontFamily: "bold",
    fontSize: 23,
  },
  text2: {
    fontFamily: "regular",
    fontSize: 17,
  },
});
