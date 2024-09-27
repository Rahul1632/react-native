import React, { useState } from 'react';
import { SectionList, Text, View, StyleSheet, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';

const contactsData = [
  {
    city: 'New York',
    data: [
      { id: '1', name: 'John Doe', phone: '123-456-7890', city: 'New York' },
      { id: '2', name: 'Jane Smith', phone: '098-765-4321', city: 'New York' }
    ],
  },
  {
    city: 'San Francisco',
    data: [
      { id: '3', name: 'Emily Johnson', phone: '555-555-5555', city: 'San Francisco' },
      { id: '4', name: 'Michael Brown', phone: '444-444-4444', city: 'San Francisco' }
    ],
  },
  {
    city: 'Los Angeles',
    data: [
      { id: '5', name: 'Sara White', phone: '111-111-1111', city: 'Los Angeles' },
    ],
  },
  {
    city: 'India',
    data: [
      { id: '6', name: 'Ram Patel', phone: '746253525352', city: 'Ahmedabad' },
      { id: '7', name: 'Harpreet Singh', phone: '87343646634', city: 'Delhi' },
      { id: '8', name: 'Manohar Singh', phone: '9994584887', city: 'Punjab' },
    ],
  },
];

const SectionListPage = () => {
  const [collapsedSections, setCollapsedSections] = useState([]);

  const toggleSection = (city) => {
    setCollapsedSections((prev) =>
      prev.includes(city)
        ? prev.filter((item) => item !== city)
        : [...prev, city]
    );
  };

  const showContactDetails = (contact) => {
    Alert.alert(
      'Contact Details',
      `Name: ${contact.name}\nPhone: ${contact.phone}\nCity: ${contact.city}`
    );
  };

  const renderSectionHeader = ({ section }) => (
    <TouchableOpacity onPress={() => toggleSection(section.city)} style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.city}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, section }) => {
    if (collapsedSections.includes(section.city)) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => showContactDetails(item)} style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.phone}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={contactsData}
        keyExtractor={(item) => item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        SectionSeparatorComponent={() => <View style={styles.separator} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    flex: 1
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default SectionListPage;
