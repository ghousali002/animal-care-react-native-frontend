import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get('window');

const Login = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
          <Field placeholder="Email / Username" keyboardType={'email-address'} />
          <Field placeholder="Password" secureTextEntry={true} />
          
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </View>

          <Btn textColor="white" bgColor={darkGreen} btnLabel="Login" Press={() => alert("Logged In")} />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 1, 
    marginVertical: height * 0.05, 
  },
  title: {
    color: 'white',
    fontSize: width * 0.16, 
    fontWeight: 'bold',
    marginVertical: height * 0.02, 
  },
  formContainer: {
    backgroundColor: 'white',
    height: height * 0.9,
    width: width * 1, 
    borderTopLeftRadius: 130,
    paddingTop: height * 0.1, 
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: width * 0.1,
    color: darkGreen,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'grey',
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    marginBottom: height * 0.02, 
  },
  forgotPassword: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 16,
    marginBottom: height * 0.1, 
  },
  forgotPasswordText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04, 
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  signupText: {
    fontSize: width * 0.04, 
    fontWeight: 'bold',
  },
  signupLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default Login;
