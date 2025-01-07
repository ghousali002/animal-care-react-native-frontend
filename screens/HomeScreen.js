import { Button } from "react-native";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";


function HomeScreen({ navigation }) {
  
  return (
   
    <View >
      {/* <Text style={styles.headingStyle}>Login & Register In React Native</Text> */}
      <Text >This is Home Screen</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      {/* <Button title="Logout" /> */}
    </View>
  );
}


export default HomeScreen;
