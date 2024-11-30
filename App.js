import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./components/SplashScreen";
import Home from './screens/Home';
import Signup from './screens/SignUp';
import Login from './screens/SignIn';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <SplashScreen onFinish={() => setSplashVisible(false)} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
    
  );
}
