import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
  TextInput, ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Identicon from '@polkadot/reactnative-identicon';
import db from '../db';
import generateContacts from '../mocks/contacts';
import { colors } from '../theme';
// import generateMessages from '../mocks/messages';

const contacts = generateContacts(30);

function Chats({ navigation }) {
  const user = useSelector((state: any) => state.user);
  const { inbox , contacts } = user;

  const [loading, setLoading] = useState(null);
  // generateMessages(user.seed, 20);

  function onNew() {
    navigation.navigate('NewMessage');
  }

  // function publicKeyFromAddress() {
  //   const seedphrase = mnemonicGenerate();
  //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

  //   const keypair = keyring.addFromMnemonic(seedphrase);

  //   console.log(u8aToHex(keypair.publicKey));
  //   console.log(u8aToHex(decodeAddress(keypair.address)));
  // }

  function recipientName(recipientAddress: string) {
    const contact = contacts.find((c) => c.address === recipientAddress);
    const isInContact = !!contact;
    const recipient = isInContact ? contact.nickname : 'X';
    return recipient;
  }

  async function onChat(chat) {
    setLoading(chat.with);
    const conversation = await db.getConv(user.address, chat.with);
    setLoading(null);
    navigation.navigate('Chat', { address: chat.with, conversation });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
          <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <FontAwesome5 name="telegram-plane" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }} />
        {/* <TextInput style={styles.searchInput} placeholder="Search in your chats" /> */}
        {inbox.map((c) => (
          <TouchableOpacity
            key={c.with}
            style={styles.contact}
            disabled={!!loading}
            onPress={() => onChat(c)}
          >
            <Identicon value={c.with} size={70} />
            <View style={styles.id}>
              <Text style={styles.contactName}>{recipientName(c.with)}</Text>
              <Text style={styles.contactSentAt}>{moment(c.last.sentAt).format('LLL')}</Text>
              <Text style={styles.contactContent} numberOfLines={2}>{c.last.encoded}</Text>
            </View>
            <View style={styles.chevronContainer}>
              {loading === c.with ? (
                <ActivityIndicator size="small" color="#666464" />
              ) : (
                <MaterialIcons name="chevron-right" size={24} color={colors.white} />
              )}
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
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.white,
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
    backgroundColor: '#F6F1F1',
    paddingLeft: 20,
    marginTop: 20,
  },
  contact: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 100,
    // backgroundColor: 'yellow',
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  contactContent: {
    fontSize: 14,
    marginTop: 8,
    maxWidth: 300,
    color: '#666464',
  },
  contactSentAt: {
    fontSize: 14,
    marginTop: 4,
    maxWidth: '100%',
    color: colors.white,
  },
  id: {
    marginLeft: 20,
    flex: 1,
  },
  chevronContainer: {
    height: '100%',
    // backgroundColor: 'red',
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
  },
});

export default Chats;
