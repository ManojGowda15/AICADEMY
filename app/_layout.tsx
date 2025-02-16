import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "./../context/UserDetailContext";
import { useState } from "react";

export default function RootLayout() {
  const [userDetail, setUserDetail] = useState(null); // Correct function name

  const [fontsLoaded] = useFonts({
    regular: require("./../assets/fonts/Outfit-Regular.ttf"),
    medium: require("./../assets/fonts/Outfit-Medium.ttf"),
    bold: require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Prevent app from rendering until fonts are loaded
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }} />
    </UserDetailContext.Provider>
  );
}
