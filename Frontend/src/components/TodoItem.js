import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onToggle }) => (
  <TouchableOpacity style={styles.container} onPress={() => onToggle(todo.id, !todo.completed)}>
    <View style={[styles.checkbox, { backgroundColor: todo.completed ? '#4CAF50' : '#E0E0E0' }]} />
    <Text style={[styles.title, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
      {todo.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    elevation: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default TodoItem;