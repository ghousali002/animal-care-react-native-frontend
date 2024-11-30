import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => setTimeout(onFinish, 1500));
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash-icon.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Animal Shelter
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: { width: 150, height: 150, marginBottom: 20 },
  text: { fontSize: 24, fontWeight: "bold", color: "#333" },
});

export default SplashScreen;
