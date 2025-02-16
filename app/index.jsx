import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/(auth)/welcome");
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("./../assets/images/splash-screen.jpg")}
      />
    </View>
  );
};

// export default Index;
export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  logo: {
    height: "40%",
    aspectRatio: 1,
  },
});
