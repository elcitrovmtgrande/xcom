import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import {
  u8aToHex,
} from '@polkadot/util';
import { updateUser } from '../store/features/userSlice';
import { keypairFromSeed } from '../utils/tools';

function Welcome({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log('user from store:', user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function session() {
      const seed = await SecureStore.getItemAsync('seedphrase');
      if (seed) {
        const keypair = keypairFromSeed(seed);
        const u = {
          address: keypair.address,
          publicKey: u8aToHex(keypair.publicKey),
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
            <Text style={styles.title}>Xcom</Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>0%</Text>
              {' '}
              registration.
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>0%</Text>
              {' '}
              tracking.
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>0%</Text>
              {' '}
              spying.
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>100%</Text>
              {' '}
              wolrdwide.
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>100%</Text>
              {' '}
              anonymous.
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.kpi}>100%</Text>
              {' '}
              privacy.
            </Text>
          </View>
          <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate('MnemonicGenerate')}>
            <Text style={styles.btnText}>Create anonymous account</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
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
    fontSize: 100,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey',
  },
  kpi: {
    fontSize: 40,
    color: 'black',
  },
  btnLogin: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: 'black',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreate: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: 'grey',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Welcome;
