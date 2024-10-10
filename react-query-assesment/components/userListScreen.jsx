import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/redux/favoriteSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchUsers } from "@/apis/apis";

const UserListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteUsers);

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const users = data?.pages?.flatMap((page) => page.users) || [];

  const handleUserPress = (user) => {
    navigation.navigate("UserDetails", { login: user.login });
  };

  const handleFavoriteToggle = (user) => {
    if (favorites.some((favUser) => favUser.id === user.id)) {
      dispatch(removeFavorite(user.id));
    } else {
      dispatch(addFavorite(user));
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error fetching users: {error.message}</Text>
      </View>
    );
  }

  const renderUser = ({ item }) => {
    const isFavorite = favorites.some((favUser) => favUser.id === item.id);

    return (
      <TouchableOpacity onPress={() => handleUserPress(item)}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Image
              source={{ uri: item.avatar_url }}
              style={styles.imageStyle}
            />
            <Text style={{ fontSize: 18 }}>{item.login}</Text>
          </View>
          <TouchableOpacity onPress={() => handleFavoriteToggle(item)}>
            <Text
              style={{ marginLeft: 10, color: isFavorite ? "red" : "gray" }}
            >
              {isFavorite ? (
                <AntDesign name="star" size={24} color="black" />
              ) : (
                <AntDesign name="staro" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item, index) =>
          item?.id ? `${item.id}-${index}` : `item-${index}`
        }
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default UserListScreen;
