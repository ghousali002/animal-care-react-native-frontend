import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Spinner from "./Spinner";

const CardFind = ({ loading, shelters, searchFlag }) => {
  const Card = ({ title, image, distance, displayAddress, email }) => (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.oldPrice}>{email}</Text>
        <Text style={styles.shipping}>{displayAddress}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {distance.toFixed(2)} meters away from you
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ marginTop: 10 }}>
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
            {shelters?.map((shelter) => (
              <Card
                key={shelter._id} // Make sure each shelter has a unique id
                title={shelter.fullName}
                image="https://media.istockphoto.com/id/1217408094/photo/stray-beautiful-dog-lean-out-from-cage-and-looking-at-human-dog-abandoned-in-shelter-and.jpg?s=612x612&w=0&k=20&c=TnnfM4WkFORNsK02MKNyji_QJbExT2JhjySXE1ByTyI="
                distance={shelter.distance}
                displayAddress={shelter.shelterDetails.displayName}
                email={shelter.email}
              />
            ))}
            {!shelters?.length && searchFlag && (
              <>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/searchNotfound.png")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>
                    We couldn't find any shelters within 10KM of your location.
                  </Text>
                </View>
              </>
            )}

            {/* <Card
              title="Quant olap shirts"
              image="https://media.istockphoto.com/id/1250060339/photo/dog-shelter.jpg?s=612x612&w=0&k=20&c=-YBjeCarIKcvzONuxHdYAr1N64DjiiDOa56QOArlvY4="
              description="100% cotton • Lightweight • Best finish"
              price="14.99"
              oldPrice="21.99"
              rating={4}
              reviews={289}
              shipping="Free shipping"
            /> */}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: { width: 350, height: 350, marginBottom: 10 },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#4A4A4A",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  reviews: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
  description: {
    fontSize: 12,
    color: "#777",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  oldPrice: {
    fontSize: 12,
    color: "#aaa",
    // textDecorationLine: "line-through",
    // marginLeft: 10,
  },
  shipping: {
    fontSize: 12,
    color: "green",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  wishlistButton: {
    borderRadius: 5,
    borderColor: "#007bff",
    paddingHorizontal: 10,
  },
});

export default CardFind;
