import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";

export default function Button({ text, type = "fill", onPress, loading }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE },
      ]}
      disabled={loading}
    >
      {!loading ? (
        <Text
          style={[
            styles.text,
            { color: type == "fill" ? Colors.WHITE : Colors.PRIMARY },
          ]}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={"small"}
          color={type == "fill" ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    borderRadius: 30,
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
});
