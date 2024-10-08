import React from "react";
import { View, StyleSheet } from "react-native";

const Obstacle = ({ position }) => {
  return (
    <View style={[styles.obstacle, { left: position.x, top: position.y }]} />
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "red", // Obstacle color
  },
});

export default Obstacle;
