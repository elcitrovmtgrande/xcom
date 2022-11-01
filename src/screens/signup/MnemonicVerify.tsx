import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import {
  u8aToHex,
} from '@polkadot/util';
import { updateUser } from '../../store/features/userSlice';
import { keypairFromSeed } from '../../utils/tools';
import db from '../../db';

function MnemonicVerify({ navigation, route }) {
  const dispatch = useDispatch();
  const { seedphrase } = route.params;
  const [loading, setLoading] = useState<boolean>(false);

  async function onSessionSave() {
    const seed = seedphrase.join(' ');
    setLoading(true);
    if (seed) {
      const keypair = await keypairFromSeed(seed);
      const u = {
        seed,
        address: keypair.address,
        publicKey: u8aToHex(keypair.publicKey),
        contacts: await db.getContacts(),
        inbox: await db.getMessages(),
      };

      dispatch(updateUser(u));
    }
    navigation.navigate('InApp');
    setLoading(false);
    await SecureStore.setItemAsync('seedphrase', seed);
    navigation.navigate('InApp');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are almost <Text style={{ color: '#00FFA3' }}>free</Text>.</Text>
      <Text style={styles.subtitle}>
        As we explained during previous step, your seedphrase is the only way to recover
        your account or to connect from another device. By this step, we ensure you will
        remember your seedphrase. This is the last step of the process.
      </Text>
      <View style={styles.mnemonicContainerContainer}>
        <View style={styles.mnemonicContainer}>
          {seedphrase.map((w: string, i: number) => (
            <View key={String(i)} style={styles.wordContainer}>
              <Text style={styles.word}>{w}</Text>
            </View>

          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onSessionSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#00052B" />
        ) : (
          <Text style={styles.btnLabel}>Let's go</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00052B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
    lineHeight: 60,
    marginLeft: -30,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  mnemonicContainerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    paddingTop: 6,
    marginTop: 40,
  },
  mnemonicContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  wordContainer: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 6,
    marginLeft: 4,
  },
  word: {
    fontSize: 16,
    color: '#00052B',
    fontWeight: 'bold'
  },
  shuffleBtn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffle: {
    marginTop: 40,
  },
  btn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#00FFA3',
    marginTop: 40,
  },
  btnLabel: {
    color: '#00052B',
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
});

export default MnemonicVerify;
