import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useIsFocused} from '@react-navigation/native';

const EditScreen = ({route, navigation}) => {
  const {note} = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const isFocused = useIsFocused();
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
  const updateNote = async (id, updatedNote) => {
    try {
      let notes = await fetchNotes();
      const index = notes.findIndex(note => {
        return note.id == id;
      });
      notes[index] = updatedNote;
      await AsyncStorage.setItem('@notes', JSON.stringify(notes));
    } catch (error) {
      console.log('Error updating note:', error);
    }
  };
  useEffect(() => {
    setTitle(note.title)
    editorRef.current.sendAction('content', 'setHtml', note.content)
  }, [isFocused]);

  const saveNote = async () => {
    const updatedNote = {
      ...note,
      title,
      content,
    };
    await updateNote(note.id, updatedNote);
    navigation.goBack();
  };

  const editorInitializedCallback = () => {
    console.log('====================================');
    console.log(note.content);
    console.log('====================================');
    editorRef.current.insertHTML(note.content);
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
        // editorInitializedCallback={editorInitializedCallback}
        initialFocus={false}
        firstFocusEnd={false}
        placeholder="Content"
        editorStyle={{
          backgroundColor: '#FFFFFF',
        }}
        initialHeight={250}
        contentWidth={windowWidth}
        onChange={newContent => setContent(newContent)}>
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
