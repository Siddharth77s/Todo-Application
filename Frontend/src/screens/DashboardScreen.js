import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/auth';
import TodoItem from '../components/TodoItem';
import { todoAPI } from '../services/api';

const DashboardScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { token, logout } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const apiWithToken = todoAPI(token);
      const { data } = await apiWithToken.list();
      setTodos(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch todos');
    }
  };

  const createTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const apiWithToken = todoAPI(token);
      const { data } = await apiWithToken.create(newTodo);
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create todo');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const apiWithToken = todoAPI(token);
      const { data } = await apiWithToken.update(id, completed);
      setTodos(todos.map(t => t.id === id ? data : t));
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileLink}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={createTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={createTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} onToggle={toggleTodo} />}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLink: {
    color: '#2196F3',
    fontSize: 16,
    marginRight: 16,
  },
  logoutBtn: {
    padding: 4,
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default DashboardScreen;