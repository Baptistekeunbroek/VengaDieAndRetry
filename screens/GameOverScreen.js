// GameOverScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GameOverScreen = ({ onRestart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Button title="Restart Game" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "red",
  },
});

export default GameOverScreen;
