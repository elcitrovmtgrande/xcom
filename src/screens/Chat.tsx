/* eslint-disable react/style-prop-object */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TextInput, TouchableOpacity, Dimensions,
  KeyboardAvoidingView, FlatList, ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import Identicon from '@polkadot/reactnative-identicon';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { getPubKeyFromAddress, encryptMessage, keypairFromSeed, identifier } from '../utils/tools';
import { Contact, Message } from '../types';

function Chat({ route }) {
  const { address, conversation } = route.params;
  const user = useSelector((state: any) => state.user);
  const { contacts } = user;

  const [lock, setLock] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(conversation || []);
  const [message, setMessage] = useState<string>('');

  const flatList = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatList.current?.scrollToEnd();
    }, 200);
  }, []);

  function recipientName(recipientAddress: string) {
    const contact = contacts.find((c: Contact) => c.address === recipientAddress);
    const isInContact = !!contact;
    const recipient = isInContact ? contact.nickname : 'X';
    return recipient;
  }

  function lockToggle() {
    setLock(!lock);
  }

  async function sendMessage() {
    setSendLoading(true);
    // 1) Encryption du message avec la cle publique du destinataire
    const userPair = await keypairFromSeed(user.seed);
    const recipientPubKey = getPubKeyFromAddress(address);
    const encrypted = encryptMessage({ senderPair: userPair, message, recipientPubKey });

    // 2) Stockage en localDB d'un nouveau message
    const msg: Message = {
      identifier: identifier(),
      sender: user.address,
      recipient: address,
      decoded: message,
      encoded: encrypted,
      writtenAt: moment().toJSON(),
      sentAt: null,
      deliveredAt: null,
      readAt: null,
    };
    // TODO: Save dans la base

    // 3) Mise à jour de la conversation
    const nextMessages = cloneDeep(conversation);
    nextMessages.push(msg);
    setMessages(nextMessages);
    setMessage('');
    setSendLoading(false);

    // 4) Envoi du message via Internet
    // TODO
    // 5) Sur le succès mise à jour du sentAt en DB et dans le state
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <FlatList
          style={styles.listWrapper}
          contentContainerStyle={styles.scrollViewContentContainer}
          data={messages}
          renderItem={({ item }) => {
            const isSender = item.sender === user.address;

            return (
              <View
                key={item.identifier}
                style={[
                  styles.msgRow,
                  isSender && styles.msgRowSender,
                ]}
              >
                <View style={[styles.msg, isSender && styles.msgSender]}>
                  <Text style={styles.msgContent}>
                    {lock ? item.encoded : item.decoded}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.identifier}
          ref={flatList}
          onContentSizeChange={() => flatList.current?.scrollToEnd()}
        />
        <View style={styles.headerContainer}>
          <BlurView
            tint="light"
            intensity={50}
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 20,
            }}
          >
            <SafeAreaView style={styles.safe}>
              <View style={styles.headerLeft}>
                <Identicon value={address} size={50} />
                <View style={styles.contact}>
                  <Text style={styles.contactName}>{recipientName(address)}</Text>
                  <Text style={styles.contactAddr}>{address}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={lockToggle}>
                {lock ? (
                  <MaterialCommunityIcons name="lock" size={30} color="white" />
                ) : (
                  <MaterialCommunityIcons name="lock-open" size={30} color="white" />
                )}
              </TouchableOpacity>
            </SafeAreaView>
          </BlurView>
        </View>
        <KeyboardAvoidingView style={styles.bottomContainer} behavior="padding">
          <SafeAreaView style={styles.safe}>
            <TextInput
              value={message}
              multiline
              placeholder="Enjoy privacy..."
              style={styles.input}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.send} onPress={sendMessage} disabled={sendLoading}>
              {sendLoading ? (
                <ActivityIndicator size="small" color="#00052B" />
              ) : (
                <FontAwesome5 name="telegram-plane" size={24} color="#00052B" />
              )}
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00052B',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    paddingTop: 16,
    paddingBotton: 16,
  },
  send: {
    width: 50,
    height: 50,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  safe: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contact: {
    marginLeft: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contactAddr: {
    fontSize: 12,
    color: 'white',
    width: 200,
    marginTop: 6,
  },
  submit: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    height: Dimensions.get('window').height,
    flexDirection: 'column-reverse',
  },
  listWrapper: {
    width: '100%', flex: 1,
  },
  listContentContainer: {
    // paddingTop: 100,
    // paddingBottom: 200,
  },
  scrollViewContentContainer: {
    paddingTop: 140,
    // paddingBottom: ,
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  msgRow: {
    width: '100%',
  },
  msgRowSender: {
    width: '100%',
    alignItems: 'flex-end',
  },
  msg: {
    padding: 20,
    backgroundColor: '#C0E1FF',
    width: 300,
    marginLeft: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  msgSender: {
    backgroundColor: '#006FD6',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#636585',
  },
  msgContent: {}
});

export default Chat;
