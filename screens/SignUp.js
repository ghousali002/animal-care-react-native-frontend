import React from 'react'; 
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get('window');

const Signup = props => {
  return (
    <Background>
      <View style={styles.container}>
        {/* Headings outside ScrollView */}
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

        {/* Wrap only the form content in the ScrollView */}
        <ScrollView 
          contentContainerStyle={styles.formContainer} 
          keyboardShouldPersistTaps="handled"
        >
          <Field placeholder="Enter Full Name" />
          <Field placeholder="Enter Email " keyboardType={'email-address'} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={styles.termsLink}>Terms & Conditions</Text>
          </View>

          <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>
              and {' '}
            </Text>
            <Text style={styles.privacyLink}>Privacy Policy</Text>
          </View>

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              alert('Account created');
              props.navigation.navigate('Login');
            }}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginTop: height * 0.02, 
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    marginBottom: height * 0.02, 
  },
  formContainer: {
    backgroundColor: 'white',
    width: width * 1, 
    borderTopLeftRadius: 130,
    paddingTop: height * 0.1, 
    paddingBottom: height * 0.1, 
    alignItems: 'center',
    flexGrow: 1, 
  },
  termsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '78%',
    paddingRight: 16,
  },
  termsText: {
    color: 'grey',
    fontSize: width * 0.04, 
  },
  termsLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04, 
  },
  privacyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '78%',
    paddingRight: 16,
    marginBottom: height * 0.02, 
  },
  privacyText: {
    color: 'grey',
    fontSize: width * 0.04,
  },
  privacyLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04, 
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  loginText: {
    fontSize: width * 0.04, 
    fontWeight: 'bold',
  },
  loginLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default Signup;
