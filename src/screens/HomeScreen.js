import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import Note from '../components/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const fetchNotes = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem('@notes');
      if (existingNotes) {
        const parsedNotes = JSON.parse(existingNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.log('Error fetching notes:', error);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(notes));
    } catch (error) {
      console.log('Error saving notes:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.log('Error deleting note:', error);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return updatedNote;
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.log('Error updating note:', error);
    }
  };

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <Text style={styles.noNotesText}>No notes found.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Note
              title={item.title}
              content={item.content}
              onDelete={() => deleteNote(item.id)}
              onPress={() =>
                navigation.navigate('Edit', {
                  note: item,
                  updateNote: (updatedNote) => updateNote(item.id, updatedNote),
                })
              }
            />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('Add', {
            addNote: (newNote) => setNotes([...notes, newNote]),
          })
        }
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noNotesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
