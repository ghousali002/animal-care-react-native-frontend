import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "./components/SplashScreen";
import Home from "./screens/Home";
import Signup from "./screens/SignUp";
import ShelterRegister from "./screens/ShelterRegister";
import Login from "./screens/SignIn";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PetAdoption from "./screens/PetAdoption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserScreen from "./screens/UserScreen";
import DrawerContent from "./utils/DrawerContent";
import { AuthProvider } from "./services/auth/authContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// Drawer Navigator Component
function AfterLoginDrawer({ setIsLoggedIn, isLoggedIn }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      )}
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: "#fff", width: 240 },
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="UserHome"
        options={{ title: "Home" }}
        component={HomeScreen}
      />
      <Drawer.Screen name="PetAdoption" component={PetAdoption} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="User" component={UserScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);
 

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        {isSplashVisible ? (
          <SplashScreen onFinish={() => setSplashVisible(false)} />
        ) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isLoggedIn ? (
                <>
                  <Stack.Screen name="HomeDrawer">
                    {(props) => (
                      <AfterLoginDrawer
                        {...props}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                      />
                    )}
                  </Stack.Screen>
                </>
              ) : (
                <>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Login">
                    {(props) => (
                      <Login {...props} setIsLoggedIn={setIsLoggedIn} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="ShelterRegister" component={ShelterRegister} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </View>
    </AuthProvider>
  );
}
