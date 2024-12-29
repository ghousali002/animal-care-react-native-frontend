import { StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.viewStyle}>
      {/* <Text style={styles.headingStyle}>Login & Register In React Native</Text> */}
      <Text style={styles.textStyle}>This is Home Screen</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      {/* <Button title="Logout" /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textStyle: {
    fontSize: 28,
    color: "black",
  },
  headingStyle: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
});
export default HomeScreen;
