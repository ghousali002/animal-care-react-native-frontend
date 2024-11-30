import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Animal's Shelter</Text>
        <Text style={styles.subtitle}>App</Text>
        <Btn
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          Press={() => props.navigation.navigate("Login")}
        />
        <Btn
          bgColor="white"
          textColor={darkGreen}
          btnLabel="Signup"
          Press={() => props.navigation.navigate("Signup")}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05, 
    marginVertical: height * 0.15, 
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: width * 0.12, // 12% of the screen width for title font size
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.1, // 10% of the screen width for subtitle font size
    marginBottom: height * 0.05, // 5% of the screen height for bottom margin
  },
});

export default Home;
