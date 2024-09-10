import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const initialTasks = [
  {
    id: "1",
    title: "Complete react-native assesment",
    status: "Pending",
    dueDate: "2024-09-15",
    description: "Code and submit react-native assessment of task-screen",
  },
  {
    id: "2",
    title: "Review team Code",
    status: "Completed",
    dueDate: "2024-14-11",
    description: "Conduct performance reviews for team's code.",
  },
  {
    id: "3",
    title: "Learn more about React-native",
    status: "Pending",
    dueDate: "2024-09-20",
    description: "Learn more topics of react native",
  },
  {
    id: "4",
    title: "Read about react native documentation",
    status: "Pending",
    dueDate: "2024-10-20",
    description: "Read about react native documentation of the best practices",
  },
];

const TaskListScreen = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const filterTasks = (status) => {
    setFilter(status);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const toggleTaskExpansion = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") return;

    const newTask = {
      id: Math.random().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: "Pending",
      dueDate: "2024-09-30",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const renderTaskCard = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => toggleTaskExpansion(item.id)}>
          <Text style={styles.taskTitle}>{item.title}</Text>
        </TouchableOpacity>
        <Icon
          name={
            expandedTaskId === item.id
              ? "keyboard-arrow-up"
              : "keyboard-arrow-down"
          }
          size={24}
          color="gray"
          onPress={() => toggleTaskExpansion(item.id)}
        />
      </View>
      <Text>Status: {item.status}</Text>
      <Text>Due Date: {item.dueDate}</Text>
      {expandedTaskId === item.id && (
        <View style={styles.expandedContent}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text>{item.description}</Text>
        </View>
      )}
      {item.status !== "Completed" && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => markTaskAsCompleted(item.id)}
        >
          <Text style={styles.completeButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addTaskContainer}>
        <Text style={styles.header}>Add New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="New task title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="New task description"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <Button title="Add Task" onPress={addNewTask} />
      </View>

      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "All" && styles.activeFilter]}
          onPress={() => filterTasks("All")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Pending" && styles.activeFilter,
          ]}
          onPress={() => filterTasks("Pending")}
        >
          <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Completed" && styles.activeFilter,
          ]}
          onPress={() => filterTasks("Completed")}
        >
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>

      <StatusBar />

      <FlatList
        data={filteredTasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  addTaskContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: "#a0a0a0",
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expandedContent: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TaskListScreen;
