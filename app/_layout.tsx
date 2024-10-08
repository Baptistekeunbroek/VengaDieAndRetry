import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoadingScreen from "../screens/LoadingScreen";
import GameScreen from "../screens/GameScreen";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <GameScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});

export default AppLayout;
