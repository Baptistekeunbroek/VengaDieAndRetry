// Bomb.js
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

const Bomb = ({ position }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Logic to detonate and destroy nearby obstacles
      // Here you could implement your logic to remove nearby obstacles
    }, 1000); // Bomb explodes after 1 second

    return () => clearTimeout(timeout);
  }, []);

  return <View style={[styles.bomb, { left: position.x, top: position.y }]} />;
};

const styles = StyleSheet.create({
  bomb: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "orange", // Bomb color
    borderRadius: 15, // Make it circular
  },
});

export default Bomb;
