import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen } from "./Constants";
import Field from "./Field";
import { login } from "../services/api/api";
import Spinner from "../utils/Spinner";
import { useAuth } from "../services/auth/authContext";

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const Login = ({ navigation, setIsLoggedIn }) => {
  const { login: contextLogin } = useAuth();
  const [email, setEmail] = useState("pilov62253@gholar.com");
  const [password, setPassword] = useState("Pakistan1234");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);
      if (response) {
        setLoading(false);
        setIsLoggedIn(true);
        contextLogin(response?.user);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
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
          ) : (
            <>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to your account</Text>
              <Field
                placeholder="Email"
                keyboardType={"email-address"}
                onTextChange={(text) => setEmail(text)}
              />
              <Field
                placeholder="Password"
                secureTextEntry={true}
                onTextChange={(text) => setPassword(text)}
              />

              <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </View>

              <Btn
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Login"
                Press={handleLogin}
              />

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account ? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={styles.signupLink}>Signup</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
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
    marginVertical: height * 0.02,
  },
  formContainer: {
    backgroundColor: "white",
    height: height * 0.9,
    width: width * 1,
    borderTopLeftRadius: 130,
    paddingTop: height * 0.1,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: width * 0.1,
    color: darkGreen,
    fontWeight: "bold",
  },
  subtitle: {
    color: "grey",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  forgotPassword: {
    alignItems: "flex-end",
    width: "78%",
    paddingRight: 16,
    marginBottom: height * 0.1,
  },
  forgotPasswordText: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  signupContainer: {
    display: "flex",
    flexDirection: "row",
  },
  signupText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  signupLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
});

export default Login;
