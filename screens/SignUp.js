import React, {  useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen } from "./Constants";
import Field from "./Field";
import { OtpInput } from "react-native-otp-entry";
import Spinner from "../utils/Spinner";
import { signup, verifyOTP } from "../services/api/api";

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const Signup = (props) => {
  const [otpFlag, setOtpFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("Arhum Ali");
  const [email, setEmail] = useState("pilov62253@gholar.com");
  const [password, setPassword] = useState("Pakistan1234");
  const [confirmPassword, setConfirmPassword] = useState("Pakistan1234");

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
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields correctly");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
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
      const userData = { fullName, email, password };
      try {
        const response = await signup(userData);
        console.log("Signup successful", response);
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
        <Text style={styles.title}>{otpFlag ? "OTP" : "Register"}</Text>
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
                placeholder="Full Name"
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

              <View style={styles.privacyContainer}>
                <Text style={styles.termsText}>
                  By signing in, you agree to our{" "}
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
                btnLabel="Sign up"
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
});

export default Signup;
