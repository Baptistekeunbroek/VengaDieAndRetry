import React from "react";
import { View, StyleSheet } from "react-native";

const Missile = ({ position }) => {
  return (
    <View style={[styles.missile, { left: position.x, top: position.y }]} />
  );
};

const styles = StyleSheet.create({
  missile: {
    position: "absolute",
    width: 10,
    height: 20,
    backgroundColor: "green", // Color of the missile
  },
});

export default Missile;
