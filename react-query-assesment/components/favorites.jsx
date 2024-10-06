import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "@/redux/favoriteSlice";
import { AntDesign } from "@expo/vector-icons";

const Favorites = ({ navigation }) => {
  const favoriteUsers = useSelector((state) => state.favorites.favoriteUsers);
  const dispatch = useDispatch();

  const handleUserPress = (user) => {
    navigation.navigate("UserDetails", { login: user.login });
  };

  const handleUnfavorite = (user) => {
    dispatch(removeFavorite(user.id));
  };

  const renderFavoriteUser = ({ item }) => (
    <View style={styles.userContainer}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => handleUserPress(item)}
      >
        <Image source={{ uri: item?.avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{item?.login}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleUnfavorite(item)}
      >
        <AntDesign name="star" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteUsers.length > 0 ? (
        <FlatList data={favoriteUsers} renderItem={renderFavoriteUser} />
      ) : (
        <Text style={styles.emptyText}>No favorite users yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#777",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  unfavoriteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Favorites;
