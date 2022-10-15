import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useSelector } from 'react-redux';
import Identicon from '@polkadot/reactnative-identicon';
import generateContacts from '../mocks/contacts';
import generateMessages from '../mocks/messages';

const contacts = generateContacts(30);

function Chats({ navigation }) {
  // const user = useSelector((state) => state.user);
  // generateMessages(user.seed, 5);
  const { showActionSheetWithOptions } = useActionSheet();

  function onNew() {
    navigation.navigate('NewMessage');
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
          <Text style={styles.title}>Chats</Text>
          <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <FontAwesome5 name="telegram-plane" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.searchInput} placeholder="Search in your chats" />
        {contacts.map((c) => (
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  id: {
    marginLeft: 20,
  },
});

export default Chats;
