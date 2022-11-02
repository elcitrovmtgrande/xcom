import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Identicon from '@polkadot/reactnative-identicon';
import { colors } from '../theme';

function To({ navigation }) {
  const contacts = useSelector((state) => state.user.contacts);

  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  function onContact(contact) {
    navigation.navigate('NewMessage', { contact });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 60 }}>
        <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.back} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts</Text>
          {/* <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <MaterialIcons name="person-add" size={24} color={colors.black} />
          </TouchableOpacity> */}
        </View>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={colors.black}
          placeholder="Search in your contacts"
          onChangeText={setFilter}
        />
        {contacts
          .filter(
            (c) => c.nickname.toLowerCase().includes(filter.toLowerCase())
              || c.address.toLowerCase().includes(filter.toLowerCase()),
          )
          .map((c) => (
            <TouchableOpacity key={c.address} style={styles.contact} onPress={() => onContact(c)}>
              <Identicon value={c.address} size={70} />
              <View style={styles.id}>
                <Text style={styles.contactName}>{c.nickname}</Text>
                <Text style={styles.contactPubKey}>{c.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
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
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 60,
  },
  newBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.compute('white', 60),
    paddingLeft: 20,
    marginTop: 20,
  },
  contact: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 100,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  contactPubKey: {
    fontSize: 14,
    marginTop: 8,
    maxWidth: 300,
    color: colors.white,
  },
  id: {
    marginLeft: 20,
  },
});

export default To;
