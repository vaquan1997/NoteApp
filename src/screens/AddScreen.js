import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import FeatherIcon from 'react-native-vector-icons/Feather';

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
    let notes = [...await fetchNotes(), newNote];
    await AsyncStorage.setItem('@notes', JSON.stringify(notes));
    setTitle('')
    setContent('')
    editorRef.current.sendAction('content', 'setHtml', '')

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <FeatherIcon name='save' size={30} color={'black'} />
      </TouchableOpacity>
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
          borderWidth: 0,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
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
    borderBottomColor: '#CCCCCC',
  },
  editor: {
    borderWidth: 0,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    marginLeft: 340,
    width: 30,
  },
  richTextToolbarStyle: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#888',
    backgroundColor: '#f5f5f5',
  },
});

export default AddScreen;
