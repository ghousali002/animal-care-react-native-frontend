import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown } from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker"; // Image picker library
import DateTimePicker from "@react-native-community/datetimepicker"; // Date Picker library
import { useAuth } from "../services/auth/authContext";

function ProfileScreen(props) {
  const { userData } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("Lahore");
  const [imageUri, setImageUri] = useState("https://placeholder.com/150"); // Default placeholder
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  // Function to open the gallery and select an image
  const pickImage = () => {
    console.log("Opening Image Library...");
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      console.log("Image Picker Response:", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log(
          "Image Picker Error:",
          response.errorCode,
          response.errorMessage
        );
      } else if (response.assets && response.assets.length > 0) {
        console.log("Selected Image URI:", response.assets[0].uri);
        setImageUri(response.assets[0].uri);
      }
    });
  };
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      console.log("Permissions Granted:", granted);
      if (
        granted["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
        granted["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
      ) {
        pickImage();
      } else {
        console.log("Required permissions are not granted.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to handle date selection
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const date = selectedDate.toLocaleDateString(); // Format the date
      setDateOfBirth(date);
    }
  };
  const togleEditProfile = () => {
    setEditProfile(!editProfile);
  };
  useEffect(() => {
    if (!editProfile && userData) {
      setEmail(userData?.email);
      setName(userData?.fullName);
    }
  }, [editProfile]);
  const handleSave = () => {
    togleEditProfile();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={requestPermissions}
          >
            <Text style={styles.cameraButtonText}>📸</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email
              {editProfile && (
                <Text style={{ color: "red" }}> (This can't be changed)</Text>
              )}
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          {/* Password Field */}
          {/* <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View> */}

          {/* Date of Birth Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.dateInputContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.dateInput}
                  value={dateOfBirth}
                  editable={false} // Prevent editing, use picker instead
                  placeholder="DD/MM/YYYY"
                />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                onChange={onDateChange}
              />
            )}
          </View>

          {/* Country/Region Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>{city}</Text>
              <ChevronDown size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        {editProfile ? (
          <TouchableOpacity
            style={{ ...styles.saveButton, backgroundColor: "green" }}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save changes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styles.saveButton, backgroundColor: "#1e2f97" }}
            onPress={togleEditProfile}
          >
            <Text style={styles.saveButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
  },
  cameraButton: {
    position: "absolute",
    right: "35%",
    bottom: 0,
    backgroundColor: "#374151",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 36,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dateInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  selectButtonText: {
    fontSize: 16,
    // color: '#000',
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
});

export default ProfileScreen;
