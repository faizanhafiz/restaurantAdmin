import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

const CustomeInput = ({
  placeholder,
  textvalue,
  secureText,
  keyBoardType = "default",
  setValue
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  return (
    <View style={[styles.inputView, isFocused && styles.inputContainerFocus]}>
      <TextInput
        placeholder={placeholder}
        value={textvalue}
        secureTextEntry={secureText}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textAlignVertical="center" // Vertically align the text content
        onChangeText={(text) => setValue(text)}
        style={{width:"100%",height:'100%',fontSize:18}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
    fontSize: 16,
    backgroundColor: "white",
    borderWidth: 1.5,
    margin: 10,
  },
  inputContainerFocus: {
    borderColor: "blue",
  },
});

export default CustomeInput;
