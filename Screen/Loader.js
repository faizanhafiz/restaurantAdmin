import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const Loader = () => {

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        style={{ width: 200, height: 200 }}
        source={require("../assets/loadinganim.json")}
        loop
        autoPlay
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
