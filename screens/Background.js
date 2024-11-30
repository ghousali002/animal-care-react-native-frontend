import React from 'react';
import { View, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ImageBackground 
        source={require("../assets/animal.jpg")} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {children}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, 
    height:"100%"
  },
  overlay: {
    flex: 1, 
    width: '100%',
  },
});

export default Background;
