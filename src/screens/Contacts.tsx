import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Identicon from '@polkadot/reactnative-identicon';
import db from '../db';
import { updateContacts } from '../store/features/userSlice';
import { colors } from '../theme';

function Contacts({ navigation }) {
  const contacts = useSelector((state: any) => state.user.contacts);

  const [filter, setFilter] = useState('');

  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  function onNew() {
    navigation.navigate('AddContact');
  }

  async function deleteContact(contact) {
    await db.deleteContact(contact);
    const nextContacts = await db.getContacts();
    dispatch(updateContacts(nextContacts));
  }

  function onContact(contact) {
    const options = ['Modify', 'Remove', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      title: contact.nickname,
      message: 'What do you want with this contact ?',
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    }, (selectedIndex) => {
      // eslint-disable-next-line default-case
      switch (selectedIndex) {
        case 0:
          // Save
          navigation.navigate('AddContact', { initialContact: contact });
          break;

        case destructiveButtonIndex:
          // Delete
          deleteContact(contact);
          break;

        case cancelButtonIndex:
        // Canceled
      }
    });
  }

  // function publicKeyFromAddress() {
  //   const seedphrase = mnemonicGenerate();
  //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

  //   const keypair = keyring.addFromMnemonic(seedphrase);

  //   console.log(u8aToHex(keypair.publicKey));
  //   console.log(u8aToHex(decodeAddress(keypair.address)));
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts</Text>
          <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <MaterialIcons name="person-add" size={24} color={colors.black} />
          </TouchableOpacity>
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
                <View style={styles.contactNameContainer}>
                  <Text style={styles.contactName}>{c.nickname}</Text>
                </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
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

export default Contacts;
