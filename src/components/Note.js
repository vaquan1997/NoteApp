import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';
const Note = ({ title, content, onDelete, onPress }) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <TouchableOpacity style={styles.noteContainer} onPress={onPress}>
      <View>
        <HTML
          source={{ html: title }}
          contentWidth={windowWidth}
          baseFontStyle={styles.noteTitle}
        />
        <HTML
          source={{ html: content }}
          contentWidth={windowWidth}
          baseFontStyle={styles.noteContent}
        />
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Note;
