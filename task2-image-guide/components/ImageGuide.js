import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const cities = [
    {
        id: '1',
        name: 'San Francisco',
        description: 'A beautiful city by the bay.',
        image: 'https://images.unsplash.com/photo-1719858403455-9a2582eca805?q=80&w=1899&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '2',
        name: 'New York',
        description: 'The Big Apple.',
        image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1887&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '3',
        name: 'Tokyo',
        description: 'The bustling capital of Japan.',
        image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1936&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '4',
        name: 'Paris',
        description: 'The city of light and love.',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '5',
        name: 'London',
        description: 'A historic and modern capital city.',
        image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '6',
        name: 'Sydney',
        description: 'Famous for the Opera House and stunning harbor.',
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1899&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '7',
        name: 'Delhi',
        description: 'The capital city of India.',
        image: 'https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2070&auto=format',
        favorite: false,
    },
    {
        id: '8',
        name: 'Rome',
        description: 'A city rich in ancient history and culture.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '9',
        name: 'Dubai',
        description: 'A city known for luxury shopping and modern architecture.',
        image: 'https://images.unsplash.com/photo-1510665724063-f77a01074aa2?q=80&w=1888&auto=format&fit=crop',
        favorite: false,
    },
    {
        id: '10',
        name: 'Rio de Janeiro',
        description: 'Famous for its beaches and carnival.',
        image: 'https://images.unsplash.com/photo-1569977688604-f8af3518b6e6?q=80&w=1935&auto=format&fit=crop',
        favorite: false,
    }
];


export default function ImageGuide() {
    const [isGridView, setIsGridView] = useState(false);
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [orientation, setOrientation] = useState('portrait');

    const detectOrientation = () => {
        const { width, height } = Dimensions?.get('window');
        setOrientation(width > height ? 'landscape' : 'portrait');
    };

    useEffect(() => {
        // Dimensions?.addEventListener('change', detectOrientation);
        // return () => Dimensions?.removeEventListener('change', detectOrientation); 
    }, []);

    const toggleView = () => {
        setIsGridView(!isGridView);
    };

    const toggleFavorite = (cityId) => {
        const updatedCities = cities.map((city) =>
            city.id == cityId ? { ...city, favorite: !city.favorite } : city
        );
        setSelectedCity(updatedCities.find((city) => city.id == selectedCity.id));
    };

    const renderCityItem = ({ item }) => (
        <TouchableOpacity onPress={() => setSelectedCity(item)}>
            <View style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cityName}>{item.name}</Text>
                    <AntDesign name={item.favorite ? 'heart' : 'hearto'} size={20} color="red" onPress={() => toggleFavorite(item.id)} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>City Guides</Text>
                <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
                    <Feather
                        name={isGridView ? 'list' : 'grid'}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {isGridView ? (
                <FlatList
                    data={cities}
                    renderItem={renderCityItem}
                    key={orientation === 'portrait' ? 2 : 3}
                    numColumns={orientation === 'portrait' ? 2 : 3}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View style={styles.singleView}>
                    <Image source={{ uri: selectedCity.image }} style={styles.singleImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.cityName}>{selectedCity.name}</Text>
                        <Text style={styles.cityDesc}>{selectedCity.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(selectedCity.id)} style={styles.heartIcon}>
                        <AntDesign name={selectedCity.favorite ? 'heart' : 'hearto'} size={30} color="red" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        padding: 10,
        // borderRadius: 5,
        // borderColor: 'black',
        // borderWidth: 1
    },
    singleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        border: 2,
        borderColor: 'black',
        width: '100%'
    },
    singleImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        position: 'relative'
    },
    textContainer: {
        width: '100%',
        padding: 5,
        alignItems: 'start',
        borderWidth: 2,
        borderColor: '#D3D3D3',
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0
    },
    cityName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cityDesc: {
        fontSize: 16,
    },
    gridImage: {
        width: '300px',
        height: 150,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    gridItem: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignItems: 'center',
        width: '96%'
    },
    gridImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
});
