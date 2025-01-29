import React,  { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getVolunteerApplications } from "../services/api/userApi";
import Spinner from "../utils/Spinner";

function VolunteerApplicationsScreen() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchVolunteerApplications = async () => {
    try {
      setLoading(true);
      const res = await getVolunteerApplications();
      if (res) {
        setApplications(res?.data);
      }
    } catch (error) {
      console.error('Error fetching volunteer applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteerApplications();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView style={styles.content}>
        
        {applications?.length > 0 ? (
          applications.map((application, index) => (
            <View key={index} style={styles.applicationCard}>
              <Text style={styles.cardTitle}>Application {index + 1}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{application.shelterName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{application.shelterEmail}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{application.shelterPhone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Availability:</Text>
                <Text style={styles.value}>{application.availability}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.value}>{formatDate(application.from)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Till:</Text>
                <Text style={styles.value}>{formatDate(application.till)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[
                  styles.status,
                  application.applicationStatus === 'Accepted' ? styles.approved :
                  application.applicationStatus === 'Rejected' ? styles.rejected :
                  styles.pending
                ]}>
                  {application.applicationStatus || 'Pending'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noApplications}>
            <Text style={styles.noApplicationsText}>
              No volunteer applications found
            </Text>
          </View>
        )}
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  applicationCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    width: 80,
  },
  value: {
    flex: 1,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: "hidden",
  },
  approved: {
    backgroundColor: "#90EE90",
    color: "#006400",
  },
  rejected: {
    backgroundColor: "#FFB6C1",
    color: "#8B0000",
  },
  pending: {
    backgroundColor: "#FFE4B5",
    color: "#8B4513",
  },
  noApplications: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noApplicationsText: {
    fontSize: 16,
    color: "#666",
  },
});

export default VolunteerApplicationsScreen;
