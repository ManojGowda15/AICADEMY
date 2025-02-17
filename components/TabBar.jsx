import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Colors from "../constant/Colors";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme(); // Get theme colors
  const icons = {
    home: (props) => (
      <Octicons name="home" size={21} color={Colors.PRIMARY} {...props} />
    ),
    explore: (props) => (
      <MaterialIcons
        name="explore"
        size={22}
        color={Colors.PRIMARY}
        {...props}
      />
    ),
    progress: (props) => (
      <Ionicons
        name="analytics-outline"
        size={22}
        color={Colors.PRIMARY}
        {...props}
      />
    ),
    profile: (props) => (
      <Ionicons
        name="person-circle-outline"
        size={24}
        color={Colors.PRIMARY}
        {...props}
      />
    ),
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#E8E8E8",
        padding: 12,
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 40,
        borderCurve: "continuous",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key} // ✅ Ensure unique key
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            {icons[route.name]({
              color: isFocused ? Colors.PRIMARY : "#000",
            })}
            <Text
              style={{
                color: isFocused ? colors.primary : colors.text,
                fontWeight: isFocused ? "bold" : "normal",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
