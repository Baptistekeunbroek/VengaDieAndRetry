import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Character from "../components/Character";
import Obstacle from "../components/Obstacle";
import GameOverScreen from "./GameOverScreen";
import Missile from "../components/Missile";
import XpBar from "../components/Xpbar"; // Import the XP bar
import UpgradeModal from "../components/UpgradeModal"; // Import the UpgradeModal

const GameScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [position, setPosition] = useState({
    x: screenWidth / 2 - 25,
    y: screenHeight - 100,
  });
  const [obstacles, setObstacles] = useState([]);
  const [missiles, setMissiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [missileCooldown, setMissileCooldown] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const xpToLevelUp = 10;

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Pause state
  const [paused, setPaused] = useState(false);

  let cooldownTime = 2000; // 2 seconds cooldown
  const characterWidth = 50;

  // Initial position for the character
  useEffect(() => {
    setPosition({
      x: screenWidth / 2 - characterWidth / 2,
      y: screenHeight - 100,
    });
  }, [screenWidth]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => !gameOver && !paused,
    onPanResponderMove: (evt, gestureState) => {
      if (!gameOver && !paused) {
        const newX = Math.max(
          0,
          Math.min(position.x + gestureState.dx, screenWidth - characterWidth)
        );
        const newY = Math.max(
          0,
          Math.min(position.y + gestureState.dy, screenHeight - 50)
        );
        setPosition({ x: newX, y: newY });

        // Victory check
        if (newY <= 0) {
          setVictory(true);
        }
      }
    },
  });

  const generateObstacle = useCallback(() => {
    const x = Math.random() * (screenWidth - 50);
    const obstacle = { id: Date.now(), x, y: 0 };
    setObstacles((prev) => [...prev, obstacle]);
  }, [screenWidth]);

  const fireMissile = () => {
    if (!missileCooldown && !gameOver) {
      const newMissile = { id: Date.now(), x: position.x + 25, y: position.y };
      setMissiles((prev) => [...prev, newMissile]);
      setMissileCooldown(true);

      setTimeout(() => {
        setMissileCooldown(false);
      }, cooldownTime);
    }
  };

  const checkCollision = useCallback(
    (obstacle) => {
      const obstacleBottom = obstacle.y + 50;
      const characterBottom = position.y + 50;
      return (
        position.x < obstacle.x + 50 &&
        position.x + 50 > obstacle.x &&
        characterBottom > obstacle.y &&
        position.y < obstacleBottom
      );
    },
    [position]
  );

  useEffect(() => {
    const missileInterval = setInterval(() => {
      if (!gameOver && !paused) {
        setMissiles((prevMissiles) =>
          prevMissiles
            .map((missile) => ({ ...missile, y: missile.y - 5 }))
            .filter((missile) => missile.y > 0)
        );
      }
    }, 50);
    return () => clearInterval(missileInterval);
  }, [gameOver, paused]);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      if (!gameOver && !paused) {
        setObstacles((prevObstacles) =>
          prevObstacles.map((obstacle) => {
            const newObstacle = { ...obstacle, y: obstacle.y + 5 };
            if (checkCollision(newObstacle)) {
              setGameOver(true);
            }
            return newObstacle;
          })
        );
      }
    }, 100);
    return () => clearInterval(obstacleInterval);
  }, [checkCollision, gameOver, paused]);

  useEffect(() => {
    const interval = setInterval(generateObstacle, 1000);
    return () => clearInterval(interval);
  }, [generateObstacle]);

  useEffect(() => {
    setObstacles((prevObstacles) => {
      return prevObstacles.filter((obstacle) => {
        const hitMissile = missiles.find(
          (missile) =>
            missile.x < obstacle.x + 50 &&
            missile.x + 10 > obstacle.x &&
            missile.y < obstacle.y + 50 &&
            missile.y + 10 > obstacle.y
        );

        if (hitMissile) {
          setMissiles((prevMissiles) =>
            prevMissiles.filter((missile) => missile.id !== hitMissile.id)
          );
          setXp((prevXp) => {
            const newXp = prevXp + 1; // Increment XP
            return newXp;
          });
          return false; // Remove obstacle
        }
        return true; // Keep obstacle
      });
    });
  }, [missiles]);

  // Level Up Logic
  useEffect(() => {
    if (xp >= xpToLevelUp) {
      setLevel((prevLevel) => prevLevel + 1); // Increment level
      setXp(0); // Reset XP
      setModalVisible(true); // Show the modal for upgrade options
      setPaused(true); // Pause the game
    }
  }, [xp, xpToLevelUp]);

  // Upgrade functions
  const onUpgradeMissile = () => {
    cooldownTime = Math.max(1000, cooldownTime - 100); // Reduce cooldown time
    setMissileCooldown(false); // Reset cooldown state
    setPaused(false); // Unpause the game
    setModalVisible(false);
    // Reduce cooldown time as needed
  };

  const onUnlockBomb = () => {
    // Implement the logic to unlock the bomb weapon
    // Example: Set a flag or update the state
    setPaused(false); // Unpause the game
    setModalVisible(false);
  };

  if (victory) {
    return (
      <View style={styles.container}>
        <Text style={styles.victoryText}>You Win!</Text>
      </View>
    );
  }

  if (gameOver) {
    return <GameOverScreen />;
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

      {missiles.map((missile) => (
        <Missile key={missile.id} position={missile} />
      ))}

      <View {...panResponder.panHandlers} style={styles.joystick}>
        <Text style={styles.joystickText}></Text>
      </View>

      <TouchableOpacity
        style={[styles.fireButton, missileCooldown && styles.cooldown]}
        onPress={fireMissile}
        disabled={missileCooldown || gameOver}
      >
        <Text style={styles.fireButtonText}>
          {missileCooldown ? "Wait..." : "Fire"}
        </Text>
      </TouchableOpacity>

      {/* Add the XP Bar here */}
      <XpBar xp={xp} xpToLevelUp={xpToLevelUp} />

      {/* Upgrade Modal */}
      <UpgradeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpgradeMissile={onUpgradeMissile}
        onUnlockBomb={onUnlockBomb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  victoryText: {
    fontSize: 32,
    color: "green",
  },
  joystick: {
    position: "absolute",
    bottom: 50,
    left: 20,
    width: 100,
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  fireButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 20,
    backgroundColor: "red",
    borderRadius: 50,
  },
  fireButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  cooldown: {
    backgroundColor: "gray",
  },
});

export default GameScreen;
