import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
const AddScreen = ({ navigation, route }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fetchNotes = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem('@notes');
      if (existingNotes) {
        const parsedNotes = JSON.parse(existingNotes);
        return parsedNotes;
      }
    } catch (error) {
      return [];
    }
  };

  const handleSaveNote = async () => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
    };
    let notes = [...await fetchNotes(),newNote];
    await AsyncStorage.setItem('@notes', JSON.stringify(notes));
    setTitle('')
    setContent('')
    editorRef.current.sendAction('content', 'setHtml','')
    
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
      <RichEditor
        ref={editorRef}
        style={styles.editor}
        placeholder="Content"
        initialContentHTML=""
        editorStyle={{
          backgroundColor: '#FFFFFF',
        }}
        initialHeight={250}
        onChange={(newContent) => setContent(newContent)}
      >
        <View />
      </RichEditor>

      <RichToolbar
        editor={editorRef}
        selectedIconTint="#873c1e"
        iconTint="#312921"
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
        style={styles.richTextToolbarStyle}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
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
