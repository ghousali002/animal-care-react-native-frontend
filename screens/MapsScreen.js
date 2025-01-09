import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = ({ startLat, startLng, endLat, endLng, routeCoordinates }) => {
  const [startLocation, setStartLocation] = useState({
    latitude: startLat,
    longitude: startLng,
  });
  const [endLocation, setEndLocation] = useState({
    latitude: endLat,
    longitude: endLng,
  });

  // State to store user's current location
  const [userLocation, setUserLocation] = useState(null);



  // Calculate the screen height for dynamic map sizing
  const screenHeight = Dimensions.get('window').height;
  const mapHeight = screenHeight * 0.4; // 40% of screen height

  // Handler for updating the user's location when it's available
  const handleUserLocationChange = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({ latitude, longitude });
  };

  return (
    <View>
      <MapView
        style={[styles.map, { height: mapHeight }]} // Apply dynamic height
        initialRegion={{
          latitude: startLocation.latitude,
          longitude: startLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        showsPointsOfInterest
        showsScale
        onUserLocationChange={handleUserLocationChange} // Capture user location
        region={userLocation ? { // Dynamically update region when user location is found
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
  map: {
    width: '100%',
  },
});

export default MapScreen;
