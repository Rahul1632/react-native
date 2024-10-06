import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/apis/apis";

const UserDetailsScreen = ({ route }) => {
  const { login } = route.params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["userDetails", login],
    queryFn: fetchUserDetails,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Error fetching user details: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: data.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{data.name || "No Name Provided"}</Text>
      <Text style={styles.username}>@{data.login}</Text>

      <Text style={styles.bio}>{data.bio || "No bio available"}</Text>

      <View style={styles.infoSection}>
        {data.company && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Company:</Text>
            <Text style={styles.infoValue}>{data.company}</Text>
          </View>
        )}
        {data.location && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{data.location}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Followers:</Text>
          <Text style={styles.infoValue}>{data.followers}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Following:</Text>
          <Text style={styles.infoValue}>{data.following}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Public Repos:</Text>
          <Text style={styles.infoValue}>{data.public_repos}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Public Gists:</Text>
          <Text style={styles.infoValue}>{data.public_gists}</Text>
        </View>
      </View>

      {data.blog ? (
        <Text style={styles.link} onPress={() => Linking.openURL(data.blog)}>
          Visit Blog
        </Text>
      ) : (
        <Text style={styles.infoValue}>No blog available</Text>
      )}

      <Text
        style={styles.profileLink}
        onPress={() => Linking.openURL(data.html_url)}
      >
        View GitHub Profile
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 24,
    borderColor: "#007bff",
    borderWidth: 2,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    color: "#6c757d",
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    color: "#495057",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  infoSection: {
    width: "100%",
    marginBottom: 24,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6c757d",
  },
  infoValue: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "500",
  },
  link: {
    fontSize: 18,
    color: "#007bff",
    marginBottom: 10,
  },
  profileLink: {
    fontSize: 18,
    color: "#28a745",
    fontWeight: "600",
    marginTop: 16,
  },
  loadingText: {
    fontSize: 18,
    color: "#6c757d",
    marginTop: 8,
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    marginTop: 8,
  },
});

export default UserDetailsScreen;
