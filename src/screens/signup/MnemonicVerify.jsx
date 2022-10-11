import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

function MnemonicVerify({ route }) {
  const { seedphrase } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        As we explained during previous step, your seedphrase is the only way to recover
        your account or to connect from another device. By this step, we ensure you will
        remember your seedphrase. This is the last step of the process.
      </Text>
      <View style={styles.mnemonicContainer}>
        <Text style={styles.mnemonic}>{seedphrase}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnLabel}>CONFIRM KEYPAIR CREATION</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  mnemonicContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginTop: 40,
  },
  mnemonic: {
    fontSize: 16,
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
    backgroundColor: 'black',
    marginTop: 40,
  },
  btnLabel: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default MnemonicVerify;
