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

export const getVolunteerApplications = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/api/getVolunteerApplications`, {
      headers: {
        Authorization: `Bearer ${token}` 
    }
    });

    return response.data;
  } catch (error) {
    ErrorAlert("fetching Volunteer Applications", error);
    console.error("fetching Volunteer Applications:", error);
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await axios.put(`${BASE_URL}/api/updateProfile`, data, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    return response.data;
  } catch (error) {
    ErrorAlert("updating profile", error);
    console.error("updating profile:", error);
    throw error;
  }
};

export const applyForVolunteer = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await axios.post(`${BASE_URL}/api/applyForVolunteer`, data, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    return response.data;
  } catch (error) {
    ErrorAlert("Apply volunteer", error);
    console.error("Apply volunteer", error);
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


