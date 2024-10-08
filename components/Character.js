import React from "react";
import { View, StyleSheet } from "react-native";

const Character = ({ position }) => {
  return (
    <View style={[styles.character, { left: position.x, top: position.y }]} />
  );
};

const styles = StyleSheet.create({
  character: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "blue", // Character color
  },
});

export default Character;
