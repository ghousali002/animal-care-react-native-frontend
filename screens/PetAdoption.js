import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { getAnimalsList } from "../services/api/userApi";
import Spinner from "../utils/Spinner";
import { Linking } from "react-native";

function PetAdoption({ navigation }) {
  const [animalsList, setAnimalsList] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filter states
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);

  // Mock data for filter options (replace with API call)
  const mockFilterOptions = {
    types: [
      { name: "Type", size: ["Size","Large"], colors: ["Color","Gray", "Blue", "Brown"], genders: ["Gender", "Male", "Female"] },
      { name: "Rabbit", size: [ "Small"], colors: [ "Agouti", "Black"], genders: ["Male", "Female"] },
      { name: "Bird", size: ["Medium"], colors: ["Color","Black", "Blue", "Brown"], genders: ["Male", "Female"] },
      { name: "Cat", size: ["Large"], colors: ["Gray", "Blue", "Brown"], genders: ["Male", "Female"] },
      { name: "Dog", size: ["Large"], colors: ["Gray", "Blue", "Brown"], genders: ["Male", "Female"] },
    ],
  };


  useEffect(() => {
    // Simulate fetching filter options
    setFilterOptions({
      types: mockFilterOptions.types.map((t) => t.name),
      genders: Array.from(new Set(mockFilterOptions.types.flatMap((t) => t.genders))),
      colors: Array.from(new Set(mockFilterOptions.types.flatMap((t) => t.colors))),
      sizes: Array.from(new Set(mockFilterOptions.types.flatMap((t) => t.size))),
    });
  }, []);

  const navigateToBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const handleSave = useCallback(
    (id) => {
      if (saved.includes(id)) {
        setSaved(saved.filter((val) => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  const fetchAnimals = async (pageNumber = 1, reset = false) => {
    if (!hasMore && !reset) return;

    try {
      setLoading(true);
      const res = await getAnimalsList({
        page: pageNumber,
        type,
        gender,
        color,
        size,
      });

      if (res && res.data.animals.length > 0) {
        if (reset) {
          setAnimalsList(res.data.animals);
        } else {
          setAnimalsList((prev) => [...prev, ...res.data.animals]);
        }
        setPage(pageNumber);
        setHasMore(res.data.animals.length === 10); // Assuming 10 items per page
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isEndReached && hasMore && !loading) {
      fetchAnimals(page + 1);
    }
  };

  const applyFilters = () => {
    setPage(1);
    setHasMore(true);
    fetchAnimals(1, true);
  };

  useEffect(() => {
    applyFilters();
  }, [type,size,color,gender,page])
  

  const openFilterModal = (filterType) => {
    setCurrentFilter(filterType);
    setModalVisible(true);
  };

  const handleFilterSelection = (value) => {
    switch (currentFilter) {
      case "type":
        setType(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "color":
        setColor(value);
        break;
      case "size":
        setSize(value);
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Filter UI */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilterModal("type")}
        >
          <Text>{type ? type : "Type"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilterModal("gender")}
        >
          <Text>{gender ? gender : "Gender"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilterModal("color")}
        >
          <Text>{color ? color : "Color"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilterModal("size")}
        >
          <Text>{size ? size : "Size"}</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={
                currentFilter === "type"
                  ? filterOptions.types
                  : currentFilter === "gender"
                  ? filterOptions.genders
                  : currentFilter === "color"
                  ? filterOptions.colors
                  : currentFilter === "size"
                  ? filterOptions.sizes
                  : []
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleFilterSelection(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {loading && page === 1 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spinner />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {animalsList.map((item, index) => {
            const isSaved = saved.includes(item?.id);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigateToBrowser(item.url)}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      style={styles.cardImg}
                      source={{ uri: item?.photos?.[0]?.full }}
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>Name: {item?.name}</Text>
                      <FontAwesome
                        color="#ea266d"
                        name="star"
                        solid={true}
                        size={12}
                        style={{ marginBottom: 2 }}
                      />
                    </View>
                    <Text style={styles.cardDates}>
                      Age: {item?.age} <Text> Gender: {item?.gender}</Text>
                    </Text>
                    <Text style={styles.cardPrice}>
                      <Text style={{ fontWeight: "600" }}>
                        Detail: {item?.description}{" "}
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          {loading && page > 1 && <Spinner />}
          {!hasMore && <Text style={styles.noMoreText}>No more animals to load.</Text>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterTab: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 8,
  },
  ageInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noMoreText: {
    textAlign: "center",
    marginVertical: 16,
    color: "#666",
  },
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
    marginRight: "auto",
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: "#595a63",
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: "#232425",
  },
});

export default PetAdoption;