import { Image, StyleSheet, Platform, SafeAreaView } from "react-native";
import TaskListScreen from "../../components/TaskListScreen";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskListScreen />
    </SafeAreaView>
  );
}
