import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const MenuScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Venga Die and Retry!</Text>
      <Button title="Start Game" onPress={() => router.push("GameScreen")} />
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
  },
});

export default MenuScreen;
