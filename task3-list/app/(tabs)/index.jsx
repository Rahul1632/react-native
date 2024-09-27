import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";

const FlatlistData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const USERS_PER_PAGE = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${USERS_PER_PAGE}`
      );
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAge = () => {
    return Math.floor(Math.random() * (60 - 18 + 1)) + 18;
  };

  const RenderUser = React.memo(({ item }) => {
    const userAge = getRandomAge();

    return <View style={styles.userCard}>
      <Image source={{ uri: item.download_url }} style={styles.profileImage} />
      <View>
        <Text style={styles.userName}>{item.author}</Text>
        <Text style={styles.userAge}>Age: {userAge}</Text>
      </View>
    </View>
  });

  const fetchMoreUsers = () => {
    if (isFetchingMore || users.length > 10) return;
    setIsFetchingMore(true);
    setPage((prevPage) => prevPage + 1);
    setTimeout(() => {
      setIsFetchingMore(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator size="large" color="#000000" />;
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} translucent={false} />

      <Text
        style={{
          width: "100%",
          fontSize: 20,
          fontWeight: "700",
          borderBottomWidth: 2,
          borderBottomColor: "gray",
          textAlign: "center",
          padding: 10
        }}
      >
        Flat List User Data
      </Text>
      <View style={{ padding: 20 }}>
        <FlatList
          data={users}
          renderItem={({ item }) => <RenderUser item={item} />}
          keyExtractor={(item) =>
            `${item.id}-${Math.random().toString(36).substr(2, 9)}`
          }
          onEndReached={fetchMoreUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </View>
  );
};

export default FlatlistData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff'
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userAge: {
    fontSize: 16,
    color: "black",
  },
});
