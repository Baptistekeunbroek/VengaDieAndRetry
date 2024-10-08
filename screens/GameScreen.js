import React, { useState, useEffect } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import Character from "../components/Character";
import Obstacle from "../components/Obstacle";
import GameOverScreen from "./GameOverScreen";

const GameScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Create a PanResponder for joystick control
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newX = Math.max(
        0,
        Math.min(position.x + gestureState.dx, screenWidth - 100)
      );
      const newY = Math.max(
        0,
        Math.min(position.y + gestureState.dy, screenHeight - 100)
      );
      setPosition({ x: newX, y: newY });
    },
  });

  // Function to generate a new obstacle
  const generateObstacle = () => {
    const x = Math.random() * (screenWidth - 50); // Random x position
    const obstacle = { id: Date.now(), x, y: 0 }; // Create an obstacle
    setObstacles((prev) => [...prev, obstacle]);
  };

  // Check for collisions between character and obstacles
  const checkCollision = (obstacle) => {
    const obstacleBottom = obstacle.y + 50; // Bottom of the obstacle
    const characterBottom = position.y + 50; // Bottom of the character

    const collision =
      position.x < obstacle.x + 50 &&
      position.x + 50 > obstacle.x &&
      characterBottom > obstacle.y &&
      position.y < obstacleBottom;

    return collision;
  };

  // Handle obstacle falling and checking for collisions
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => {
        return prev
          .map((obstacle) => {
            const newObstacle = { ...obstacle, y: obstacle.y + 5 }; // Move obstacle down
            if (checkCollision(newObstacle)) {
              setGameOver(true); // Set game over if collision detected
            }
            return newObstacle;
          })
          .filter((obstacle) => obstacle.y < screenHeight); // Remove off-screen obstacles
      });
    }, 100); // Adjust speed of falling obstacles

    // Generate a new obstacle every second
    const obstacleInterval = setInterval(generateObstacle, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(obstacleInterval);
    };
  }, [position]);

  const resetGame = () => {
    setPosition({ x: 0, y: 0 });
    setObstacles([]);
    setGameOver(false);
  };

  if (gameOver) {
    return <GameOverScreen onRestart={resetGame} />; // Pass the reset function to GameOverScreen
  }

  return (
    <View style={styles.container}>
      <Character position={position} />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          position={{ x: obstacle.x, y: obstacle.y }}
        />
      ))}
      <View {...panResponder.panHandlers} style={styles.joystick}></View>
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
  joystick: {
    position: "absolute",
    bottom: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Joystick background
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameScreen;
