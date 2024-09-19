import ImageGuide from "@/components/ImageGuide";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <ImageGuide />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  toggleButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  singleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singleImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gridItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  gridImage: {
    width: "100%",
    height: 150,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
