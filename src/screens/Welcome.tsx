import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions,
} from 'react-native';
import { SvgXml } from "react-native-svg";
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import {
  u8aToHex,
} from '@polkadot/util';
import { updateUser } from '../store/features/userSlice';
import { keypairFromSeed } from '../utils/tools';
import db from '../db';

function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function session() {
      const seed = await SecureStore.getItemAsync('seedphrase');
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
    }

    session();
  }, []);

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to your <Text style={{ color: '#00FFA3'}}>private space</Text>.</Text>
            <Text style={styles.subtitle}>
              Start enjoying privacy now. It's 100% anonymous, with no personal data stored. Here, you are really free to talk with people you want to chat with.
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.btnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate('MnemonicGenerate')}>
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
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
  header: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
    lineHeight: 58,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  kpi: {
    fontSize: 40,
    color: 'black',
  },
  btnLogin: {
    width: (Dimensions.get('window').width / 2) * 0.8,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#00FFA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreate: {
    width: (Dimensions.get('window').width / 2) * 0.8,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  btnText: {
    color: '#00052B',
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
});

export default Welcome;
