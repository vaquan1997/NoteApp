import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Note = ({ title, content, onDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.noteContainer} onPress={onPress}>
      <View>
      <Text style={styles.noteTitle}>{title.toString()}</Text>
        <Text style={styles.noteContent}>{content.toString()}</Text>
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
    fontSize: 18,
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
