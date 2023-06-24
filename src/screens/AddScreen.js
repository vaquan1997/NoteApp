import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddScreen = ({ navigation, route }) => {
  const { addNote } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
    };
    addNote && addNote(newNote);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        autoFocus
      />
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  saveButton: {
    marginRight: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AddScreen;
