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
import Spinner from "../utils/Spinner";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { applyForVolunteer } from "../services/api/userApi";
import { useAuth } from "../services/auth/authContext";


function ApplyForVolunteerScreen(props) {
    const { setUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [shelterEmail, setShelterEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [fromDatePicker, setFromDatePicker] = useState(false);
  const [tillDatePicker, setTillDatePicker] = useState(false);
  const [availability, setAvailability] = useState("On-Demand");
  const [fromDate, setFromDate] = useState(new Date());
  const [tillDate, setTillDate] = useState(new Date());

  // Function to handle date selection
  const onFromDateChange = (event, selectedDate) => {
    setFromDatePicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onTillDateChange = (event, selectedDate) => {
    setTillDatePicker(false);
    if (selectedDate) {
      setTillDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    try {
      // Add validation and submission logic here
      if (!shelterEmail || !summary || !fromDate || !tillDate) {
        alert("Please fill in all fields");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shelterEmail)) {
        alert("Please enter a valid shelter email address");
        return false;
      }
      const timeDiff = Math.abs(tillDate.getTime() - fromDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (fromDate.getTime() === tillDate.getTime()) {
        alert("Start date and end date cannot be the same");
        return;
      }

      if (diffDays < 14) {
        alert("Volunteer period must be at least 14 days");
        return;
      }

      const data = {
        shelterEmail,
        summary,
        fromDate,
        tillDate,
        availability
      };

      setLoading(true);
      const res = await applyForVolunteer(data);
      if (res) {
        setLoading(false);
        setShelterEmail("");
        setSummary("");
        setFromDate(new Date());
        setTillDate(new Date());
        setAvailability("On-Demand");
        setUserData(res?.data);
        alert(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  const showDatePicker = (type) => {
    if (Platform.OS === 'android') {
      if (type === 'from') {
        setFromDatePicker(true);
      } else {
        setTillDatePicker(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shelter Email</Text>
              <TextInput
                style={styles.input}
                value={shelterEmail}
                onChangeText={setShelterEmail}
                placeholder="Enter shelter email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Volunteer Date</Text>
              <View style={styles.dateInputContainer}>
                <TouchableOpacity onPress={() => showDatePicker('from')}>
                  <TextInput
                    style={styles.dateInput}
                    value={fromDate.toLocaleDateString()}
                    editable={false}
                    placeholder="DD/MM/YYYY"
                  />
                </TouchableOpacity>
              </View>
              {fromDatePicker && (
                <DateTimePicker
                  testID="fromDatePicker"
                  value={fromDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onFromDateChange}
                  minimumDate={new Date()} 
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Volunteer Date</Text>
              <View style={styles.dateInputContainer}>
                <TouchableOpacity onPress={() => showDatePicker('till')}>
                  <TextInput
                    style={styles.dateInput}
                    value={tillDate.toLocaleDateString()}
                    editable={false}
                    placeholder="DD/MM/YYYY"
                  />
                </TouchableOpacity>
              </View>
              {tillDatePicker && (
                <DateTimePicker
                  testID="tillDatePicker"
                  value={tillDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onTillDateChange}
                  minimumDate={new Date()} 
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Availability</Text>
              <Picker
                selectedValue={availability}
                onValueChange={setAvailability}
                style={styles.picker}
              >
                <Picker.Item label="Part-Time" value="Part-Time" />
                <Picker.Item label="Full-Time" value="Full-Time" />
                <Picker.Item label="On-Demand" value="On-Demand" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Summary</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={summary}
                onChangeText={setSummary}
                placeholder="Tell me about yourself..."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Apply as Volunteer</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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
  picker: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#fff",
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

export default ApplyForVolunteerScreen;
