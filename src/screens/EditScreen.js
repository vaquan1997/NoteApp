import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const EditScreen = ({ route, navigation }) => {
  const { note, updateNote } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const editorRef = useRef(null);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    setContent(note.content);
  }, [note.content]);

  const saveNote = () => {
    const updatedNote = {
      ...note,
      title,
      content,
    };
    updateNote && updateNote(updatedNote);
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
      {/* Rich Editor */}
      <RichEditor
        ref={editorRef}
        style={styles.editor}
        initialContentHTML={content}
        placeholder="Content"
        editorStyle={{
          backgroundColor: '#FFFFFF',
        }}
        initialHeight={250}
        contentWidth={windowWidth}
        onChange={(newContent) => setContent(newContent)}
      >
        <View />
      </RichEditor>

      {/* Rich Toolbar */}
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
  editor: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    marginRight: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  richTextToolbarStyle: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#888',
    backgroundColor: '#f5f5f5',
  },
});

export default EditScreen;
