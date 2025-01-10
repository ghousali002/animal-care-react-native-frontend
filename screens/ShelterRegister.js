import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Loc from "expo-location";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen } from "./Constants";
import Field from "./Field";
import { OtpInput } from "react-native-otp-entry";
import Spinner from "../utils/Spinner";
import { signupShelter, verifyOTP } from "../services/api/api";

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const ShelterRegister = (props) => {
  const [otpFlag, setOtpFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("Arhum Ali");
  const [email, setEmail] = useState("pilov62253@gholar.com");
  const [password, setPassword] = useState("Pakistan1234");
  const [confirmPassword, setConfirmPassword] = useState("Pakistan1234");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [capacity, setCapacity] = useState(null);

  const getLocation = async () => {
    let { status } = await Loc.requestForegroundPermissionsAsync();
    if (status === "granted") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location fetched:", position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error fetching location:", error);
          alert("Error fetching location");
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      alert("Permission to access location was denied");
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      const data = await verifyOTP(email, otp);
      if (data) {
        setOtpFlag(false);
        setOtp("");
        alert("Email Verified Successfully");
        props.navigation.navigate("Login");
      }
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  const validateForm = () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !capacity ||
      !location.latitude ||
      !location.longitude
    ) {
      alert("Please fill in all fields correctly");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!/^\d*$/.test(capacity)) {
      alert("Please enter a valid Capacity Number");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long.\n" +
          "Contain at least one uppercase letter.\n" +
          "Contain at least one lowercase letter.\n"
        // "Contain at least one special character (e.g., @, #, $, etc.)"
      );
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setLoading(true);
      const userData = { fullName, email, password, location, capacity };
      try {
        const response = await signupShelter(userData);
        console.log("Signup shelter successful", response);
        setOtpFlag(true);
        setOtp("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  return (
    <Background>
      <View style={styles.container}>
        {/* Headings outside ScrollView */}
        <Text
          style={{
            ...styles.title,
            fontSize: !otpFlag ? width * 0.1 : width * 0.16,
          }}
        >
          {otpFlag ? "OTP" : "Shelter Register"}
        </Text>
        <Text style={styles.subtitle}>
          {otpFlag ? "One-Time-Pass" : "Create a new account"}
        </Text>

        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </View>
          ) : otpFlag ? (
            <View style={styles.container}>
              <Text style={styles.otpTitle}>Verify Email</Text>
              <Text style={styles.otpSubtitle}>
                Enter 6 digits code recieved on your email{" "}
              </Text>
              <Text style={styles.termsLink}>{email}</Text>

              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                autoFocus={false}
                hideStick={true}
                placeholder="******"
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  containerStyle: [styles.otpContainer, styles.otpInput],
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                  focusStickStyle: styles.focusStick,
                  focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                  placeholderTextStyle: styles.placeholderText,
                  filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                  disabledPinCodeContainerStyle:
                    styles.disabledPinCodeContainer,
                }}
              />

              <Btn
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Verify OTP"
                Press={handleOtpSubmit}
              />
            </View>
          ) : (
            <>
              <Field
                placeholder="Shelter Name"
                onTextChange={(text) => setFullName(text)}
              />
              <Field
                placeholder="Email "
                keyboardType={"email-address"}
                onTextChange={(text) => setEmail(text)}
              />
              <Field
                placeholder="Password"
                secureTextEntry={true}
                onTextChange={(text) => setPassword(text)}
              />
              <Field
                placeholder="Confirm Password"
                secureTextEntry={true}
                onTextChange={(text) => setConfirmPassword(text)}
              />
              <Field
                placeholder="Capicity"
                keyboardType="numeric"
                onTextChange={(text) => setCapacity(text)}
              />
              {/* Display current location */}
              {location.latitude && location.longitude ? (
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>
                    Latitude: {location.latitude.toFixed(4)}, Longitude:{" "}
                    {location.longitude.toFixed(4)}
                  </Text>
                </View>
              ) : (
                // <Text style={styles.locationText}>Loading location...</Text>
                <TouchableOpacity
                  style={{ ...styles.saveButton, backgroundColor: "green" }}
                  onPress={getLocation}
                >
                  <Text style={styles.saveButtonText}>Add Location</Text>
                </TouchableOpacity>
              )}

              <View style={styles.privacyContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{" "}
                </Text>
              </View>

              <View style={styles.privacyContainer}>
                <Text style={styles.privacyLink}>Terms & Conditions </Text>
                <Text style={styles.privacyText}>and </Text>
                <Text style={styles.privacyLink}>Privacy Policy</Text>
              </View>

              <Btn
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Register"
                Press={handleSignup}
              />

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: width * 1,
    marginVertical: height * 0.05,
  },
  title: {
    color: "white",
    fontSize: width * 0.16,
    fontWeight: "bold",
    marginTop: height * 0.02,
  },
  subtitle: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  formContainer: {
    backgroundColor: "white",
    width: width * 1,
    borderTopLeftRadius: 130,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.1,
    alignItems: "center",
    flexGrow: 1,
  },
  termsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "78%",
    paddingRight: 16,
  },
  termsText: {
    color: "grey",
    fontSize: width * 0.04,
  },
  termsLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  privacyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "78%",
    paddingRight: 16,
    marginBottom: height * 0.02,
  },
  privacyText: {
    color: "grey",
    fontSize: width * 0.04,
  },
  privacyLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  loginText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  loginLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  otpContainer: {
    flex: 1,
    marginVertical: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    gap: width * 0.03,
  },
  otpInput: {
    marginBottom: height * 0.03,
  },
  otpTextInput: {
    fontSize: width * 0.06,
    borderBottomWidth: 2,
    borderBottomColor: darkGreen,
    textAlign: "center",
    marginHorizontal: width * 0.02,
  },
  otpTitle: {
    color: darkGreen,
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  otpSubtitle: {
    color: "grey",
    fontSize: width * 0.04,
    marginBottom: height * 0.05,
  },
  saveButton: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  locationContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ShelterRegister;
