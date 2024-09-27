import React from "react";
import { ScrollView, StyleSheet, Image, Platform, Text, StatusBar, View, FlatList } from "react-native";

export default function UserProfile() {
  const userProfileData = {
    name: 'Rahul Panchal',
    age: 23,
    description: 'Hi there! I am a software developer with a passion for creating efficient and scalable web applications. I specialize in JavaScript and React, and I enjoy tackling complex problems with clean, maintainable code.'
    ,
    profilePicture: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    skills: ['JavaScript', 'React', 'Node.js', 'React Native', 'CSS', 'Tailwind CSS'],
    galleryImages: [
      'https://picsum.photos/200/200?grayscale',
      'https://picsum.photos/200/200?dog',
      'https://picsum.photos/200/200?cat',
      'https://picsum.photos/200/200?car',
      'https://picsum.photos/200/200?bike',
      'https://picsum.photos/200/200?cycle',
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userProfilePicture}>
        <Image
          source={{ uri: userProfileData.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{userProfileData.name}</Text>
        <Text style={styles.userAge}>Age: {userProfileData.age}</Text>
        <Text style={styles.userDescription}>{userProfileData.description}</Text>
      </View>
      <View style={styles.skillsSection}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {userProfileData.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Gallary</Text>
        <FlatList
          data={userProfileData.galleryImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.galleryImage} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 32
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  userProfilePicture: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userAge: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  userDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'justify'
  },
  skillsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillBadge: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  skillText: {
    fontSize: 16,
    color: '#333',
  },
  gallerySection: {
    marginBottom: 20,
  },
  galleryImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
});