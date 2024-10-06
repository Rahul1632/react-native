import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { favoritesUsers } from "@/redux/favoriteSlice.js";

const FavoritesUserList = ({ navigation }) => {
  const favoriteUsers = useSelector((state) => state.favorites.favoriteUsers);
  console.log(favoriteUsers);

  const handleUserPress = (user) => {
    navigation.navigate("UserDetails", { login: user.login });
  };

  const renderFavoriteUser = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <Image
          source={{ uri: item?.avatar_url }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <Text style={{ fontSize: 18 }}>{item?.login}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Users</Text>
      {favoriteUsers.length > 0 ? (
        <FlatList data={favoritesUsers} renderItem={renderFavoriteUser} />
      ) : (
        <Text style={styles.emptyText}>No favorite users yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default FavoritesUserList;
