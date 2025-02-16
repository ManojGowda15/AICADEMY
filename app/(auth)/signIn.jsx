import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState();

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        ToastAndroid.show("Incorrect Email & Password", ToastAndroid.BOTTOM);
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data());
    setUserDetail(result.data());
  };

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={() => router.back()}
        name="left"
        size={24}
        color="black"
        style={{
          marginBottom: 25,
          paddingRight: 10,
        }}
      />
      <Text style={styles.text}>Welcome Back.</Text>
      <Text style={styles.text_description}>Fill the credentials to login</Text>

      <TextInput
        onChangeText={(value) => setEmail(value)}
        style={styles.text_input}
        placeholder="Enter your Email"
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        style={styles.text_input}
        secureTextEntry
        placeholder="Enter your Password"
      />

      <TouchableOpacity
        disabled={loading}
        onPress={onSignInClick}
        style={styles.button}
      >
        {!loading ? (
          <Text style={styles.button_text}>Sign In</Text>
        ) : (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        )}
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text>Don't have an Account?</Text>
        <Pressable onPress={() => router.push("/(auth)/signUp")}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "bold",
            }}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.WHITE,
    padding: 23,
  },
  text: {
    fontSize: 28,
    fontFamily: "bold",
  },
  text_description: {
    fontSize: 15,
    fontFamily: "medium",
  },
  text_input: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 25,
    borderRadius: 30,
    fontFamily: "medium",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    marginTop: 25,
    borderRadius: 25,
  },
  button_text: {
    fontFamily: "medium",
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 15,
    alignSelf: "center",
    fontFamily: "regular",
  },
});
