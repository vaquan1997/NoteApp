import React, { useEffect, useState  } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Note from '../components/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchNotes();
  }, [isFocused]);



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
      await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
      await setNotes(updatedNotes);
    } catch (error) {
      console.log('Error deleting note:', error);
    }
  };

  

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        onChangeText={handleSearch}
        value={searchText}
      />
      {filteredNotes.length === 0 ? (
        <Text style={styles.noNotesText}>No notes found.</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Note
              title={item.title}
              content={item.content}
              onDelete={() => deleteNote(item.id)}
              onPress={() =>
                navigation.navigate('Edit', {
                  note: {...item},
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
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
