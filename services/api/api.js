import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../Constant";
// Set up base URL

export const ErrorAlert = (apiName, error) => {
  let message = `Error during ${apiName}: `;

  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      message += "You are not authorized.";
    } else if (status === 500) {
      message += "Internal Server Error.";
    } else if (status === 400) {
      message += error.response.data.message || "Bad request.";
    } else {
      message += error.response.data.message || "An error occurred.";
    }
  } else if (error.request) {
    message += "No response from the server.";
  } else {
    message += error.message || "An unexpected error occurred.";
  }

  alert(message);
};

export const login = async (email, password) => {
  try {
    console.log('login ->',email,
      password,)
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    // Store the token in localStorage
    if (response?.data?.token) {
      console.log(response?.data?.token)
      await AsyncStorage.setItem("token", response.data.token); // Save token
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user)); // Save user Data
    }
    return response.data;
  } catch (error) {
    ErrorAlert("login", error);
    console.error(
      "Login error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//signup API call
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, userData);
    return response.data;
  } catch (error) {
    ErrorAlert("Sign up", error);
    console.error("signup error:", error);
    throw error;
  }
};

//signup API call
export const signupShelter = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signupShelter`, userData);
    return response.data;
  } catch (error) {
    ErrorAlert("Sign up Shelter", error);
    console.error("signup Shelter error:", error);
    throw error;
  }
};

//verifyOTP API call
export const verifyOTP = async (email, otp) => {
  try {
    const body = { email, otp };
    const response = await axios.post(`${BASE_URL}/api/verifyOtp`, body);
    return response.data;
  } catch (error) {
    ErrorAlert("Verify Otp", error);
    console.error("Verify Otp:", error);
    throw error;
  }
};

// file upload API call
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error.response?.data || error.message);
    throw error;
  }
};
