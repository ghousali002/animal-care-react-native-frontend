import { Alert, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MapScreen from "./MapsScreen";
import * as Loc from "expo-location";
import { useAuth } from "../services/auth/authContext";
import CardFind from "../utils/CardFind";
import { searchSheltersByLocations } from "../services/api/userApi";

function HomeScreen({ navigation }) {
  const { role } = useAuth();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);

  const getLocation = async () => {
    if (!location?.latitude || !location?.longitude) {
      let { status } = await Loc.requestForegroundPermissionsAsync();
      if (status !== 'granted') { alert('Permission to access location was denied'); return; }
      if (status === "granted") {
        const locat = await Loc.getCurrentPositionAsync({ accuracy: Loc.Accuracy.High, timeout: 10000 });
        console.log(locat)
        setLocation({
          latitude: locat?.coords?.latitude,
          longitude: locat?.coords?.longitude,
        });
        searchShelters({
          latitude: locat?.coords?.latitude,
          longitude: locat?.coords?.longitude,
        });
      } else {
        alert("Permission to access location was denied");
      }
    } else {
      console.log('getLocation else')
      searchShelters(location);
    }
  };

  const searchShelters = async (location) => {
    try {
      setSearchFlag(true)
      console.log(location, "ll");
      setLoading(true);
      if (location && location.latitude && location.longitude) {
        const data = await searchSheltersByLocations(location);
        if (data && data?.data) {
          console.log(data, ";l");
          setShelters(data?.data);
          data.data.forEach((shelter) => {
            console.log(
              `${shelter.fullName}: ${shelter.distance.toFixed(
                2
              )} meters away...`
            );
          });
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error("No data found");
        }
      } else {
        setLoading(false);
        throw new Error("Invalid location data");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching nearest shelters:", error);
    }
  };

  return (
    <>
      <ScrollView>
        {role !== "Shelter" && (
          <>
            <View style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.text}>Find Nearest Shelter</Text>
                <TouchableOpacity
                  style={{
                    ...styles.saveButton,
                    backgroundColor: "green",
                    marginLeft: 10,
                  }}
                  onPress={getLocation}
                >
                  <Text style={styles.saveButtonText}>Find</Text>
                </TouchableOpacity>
              </View>
            </View>
            <MapScreen
              startLat={location?.latitude ?? 37.7749}
              startLng={location?.longitude ?? -122.4194}
              endLat={34.0522}
              endLng={-118.2437}
              routeCoordinates={[]}
              shelters={shelters}
            />
          </>
        )}
        <View style={styles.container}>
          <CardFind loading={loading} shelters={shelters} searchFlag={searchFlag}/>
        </View>
      </ScrollView>
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
