import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete(); // Call the function to move to the menu
    }, 3000); // Show loading screen for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
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
  loadingText: {
    fontSize: 24,
  },
});

export default LoadingScreen;
