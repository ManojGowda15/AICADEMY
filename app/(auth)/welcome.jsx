import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Colors from "./../../constant/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function Welcome() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      router.replace("/(tabs)/home");
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/landing-image.jpeg")}
        style={{
          width: "100%",
          height: 380,
          marginTop: 90,
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            marginTop: 25,
            fontFamily: "bold",
          }}
        >
          Welcome to AICADEMY
        </Text>

        <Text style={styles.description}>
          Transforming your ideas into engaging educational content effortlessly
          with AI.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signIn")}
          style={styles.button}
        >
          <Text style={[styles.button_text, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "reular",
  },
  button: {
    padding: 16,
    backgroundColor: Colors.WHITE,
    marginTop: 65,
    borderRadius: 30,
  },
  button_text: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "medium",
  },
});
