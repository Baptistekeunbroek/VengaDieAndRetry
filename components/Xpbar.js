import React from "react";
import { View, Text, StyleSheet } from "react-native";

const XpBar = ({ xp, xpToLevelUp }) => {
  const progress = (xp / xpToLevelUp) * 100; // Calculate the progress percentage

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        XP: {xp} / {xpToLevelUp}
      </Text>
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bar: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#76c7c0",
  },
});

export default XpBar;
