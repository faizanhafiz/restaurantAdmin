import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const CustomeButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.touchableButton} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableButton: {
    backgroundColor: "#FF6200", // Custom background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 8, // Border radius
    width: width * 0.8,
    marginVertical: 20,
    inputContainerFocus: {
      borderColor: "blue", // Customize the focused border color
    },
   
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default CustomeButton;
