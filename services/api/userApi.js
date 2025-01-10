import { BASE_URL } from "../../Constant";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorAlert } from "./api";

export const getAnimalsList = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/api/getAnimals`, {
      headers: {
        Authorization: `Bearer ${token}` 
    }
    });

    return response.data;
  } catch (error) {
    ErrorAlert("fetching animals", error);
    console.error("fetching animals:", error);
    throw error;
  }
};

export const searchSheltersByLocations = async (location) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    if (!location.latitude || !location.longitude) {
      throw new Error("Location is missing. Please allow location access.");
    }
    console.log('searching...')
    const response = await axios.get(`${BASE_URL}/api/searchSheltersByLocations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    return response.data;
  } catch (error) {
    ErrorAlert("fetching nearest shelters", error);
    console.error("Error fetching nearest shelters:", error);
    throw error;
  }
};


