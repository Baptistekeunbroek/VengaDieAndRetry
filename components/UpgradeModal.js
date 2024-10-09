// components/UpgradeModal.js
import React from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";

const UpgradeModal = ({ visible, onClose, onUpgradeMissile, onUnlockBomb }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Level Up!</Text>
          <Text style={styles.text}>Choose your upgrade:</Text>
          <Button
            title="Upgrade Missile (Reduce Cooldown)"
            onPress={onUpgradeMissile}
          />
          <Button
            title="Unlock Bomb (Detonate Nearby Obstacles)"
            onPress={onUnlockBomb}
          />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
});

export default UpgradeModal;
