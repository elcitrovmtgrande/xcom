import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import generateContacts from '../mocks/contacts';

const contacts = generateContacts(30);

function Contacts() {
  function onNew() {
    // Todo
  }

  function onContact(contact) {
    // Todo
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts</Text>
          <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <MaterialIcons name="person-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.searchInput} placeholder="Search in your contacts" />
        {contacts.map((c) => (
          <TouchableOpacity key={c.publicKey} style={styles.contact} onPress={() => onContact(c)}>
            <Text style={styles.contactName}>{c.nickname}</Text>
            <Text style={styles.contactPubKey}>{c.publicKey}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  newBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F6F1F1',
    paddingLeft: 20,
    marginTop: 20,
  },
  contact: {
    marginTop: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactPubKey: {
    fontSize: 14,
    marginTop: 8,
    maxWidth: 300,
    color: '#666464',
  },
});

export default Contacts;
