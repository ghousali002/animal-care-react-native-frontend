import { Button, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapScreen from "./MapsScreen";
import { useAuth } from "../services/auth/authContext";

function HomeScreen({ navigation }) {
  const { role } = useAuth();

  return (
    <>
      {role !== "Shelter" && (
        <>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Find Nearest Shelter</Text>
              <TouchableOpacity
                style={{ ...styles.saveButton, backgroundColor: "green", marginLeft: 10}}
                // onPress={getLocation}
              >
                <Text style={styles.saveButtonText}>Find</Text>
              </TouchableOpacity>
            </View>
          </View>
          <MapScreen
            startLat={37.7749} // San Francisco
            startLng={-122.4194}
            endLat={34.0522} // Los Angeles
            endLng={-118.2437}
            routeCoordinates={[
              { latitude: 37.7749, longitude: -122.4194 },
              { latitude: 34.0522, longitude: -118.2437 },
            ]}
          />
        </>
      )}
      <View style={styles.container}>
        <Text style={styles.text}>This is Home Screen</Text>

        {/* Map Component */}

        {/* Navigation Buttons */}
        <Button
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    margin: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default HomeScreen;
