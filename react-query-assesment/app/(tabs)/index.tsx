import React from "react";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserListScreen from "../../components/userListScreen";
import UserDetailsScreen from "../../components/userDetailsScreen";
import Favorites from "../../components/favorites";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserList"
      component={UserListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetailsScreen}
      options={{ title: "User Details" }}
    />
  </Stack.Navigator>
);

export default function HomeScreen() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <QueryClientProvider client={queryClient}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Users") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Favorites") {
                  iconName = focused ? "heart" : "heart-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Users"
              component={UserStack}
              // options={{ tabBarStyle: { display: "none" } }}
            />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
