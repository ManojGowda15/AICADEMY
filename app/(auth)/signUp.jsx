import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import { router, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from './../../context/UserDetailContext';

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setuserDetail } = useContext(UserDetailContext);

  const CreateNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
        // SAVE USER TO DATABASE
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const SaveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);
    setuserDetail(data);
    // NAVIGATE TO NEW SCREEN
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
      <Text style={styles.text}>Let's,</Text>
      <Text style={styles.text}>Get Started.</Text>
      <Text style={styles.text_description}>
        Fill the details to create account
      </Text>

      <TextInput
        onChangeText={(value) => setFullName(value)}
        style={styles.text_input}
        placeholder="Enter your Full Name"
      />
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

      <TouchableOpacity onPress={CreateNewAccount} style={styles.button}>
        <Text style={styles.button_text}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text>Already have an Account?</Text>
        <Pressable onPress={() => router.push("/(auth)/signIn")}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "bold",
            }}
          >
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
