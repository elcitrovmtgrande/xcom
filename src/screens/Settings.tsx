import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';
// import {
//   mnemonicGenerate,
//   mnemonicToMiniSecret,
//   mnemonicValidate,
//   ed25519PairFromSecret,
// } from '@polkadot/util-crypto';
// import { Keyring } from '@polkadot/keyring';
// import { stringToU8a, u8aToHex, u8aToString } from '@polkadot/util';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Identicon from '@polkadot/reactnative-identicon';
import Popup from '../utils/Popup';
import { colors } from '../theme';

function Settings() {
  const user = useSelector((state: any) => state.user);
  const { address, publicKey } = user;

  // async function keyringFx() {
  //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

  //   const mnemonic = mnemonicGenerate();

  //   console.log(mnemonic);
  //   // create & add the pair to the keyring with the type and some additional
  //   // metadata specified
  //   const senderPair = keyring.addFromUri('ritual fever hawk rude horror art matrix exile
  // border hand kingdom visual', { name: 'Sender pair' }, 'ed25519');
  //   const receiverPair = keyring.addFromUri(mnemonicGenerate(),
  // { name: 'Receiver pair' }, 'ed25519');

  //   // the pair has been added to our keyring
  //   console.log(keyring.pairs.length, 'pairs available');

  //   // log the name & address (the latter encoded with the ss58Format)
  //   console.log(senderPair.meta.name, 'has address', senderPair.address);
  //   console.log(receiverPair.meta.name, 'has address', receiverPair.address);

  //   const message = 'Je vais révolutionner le monde des communications.';
  //   console.log('message encodé:', stringToU8a(message));

  //   const encryptedMessage = senderPair.encryptMessage(message, receiverPair.publicKey);
  //   console.log('encryptedMessage:', encryptedMessage);
  //   const encryptedMessageString = u8aToString(encryptedMessage);
  //   const encryptedMessageHex = u8aToHex(encryptedMessage);
  //   console.log('encryptedMessageString:', encryptedMessageString);
  //   console.log('encryptedMessageHex:', encryptedMessageHex);

  //   const decryptedMessage = receiverPair.decryptMessage(encryptedMessage, senderPair.publicKey);
  //   console.log('decryptedMessage:', u8aToString(decryptedMessage));
  // }

  // async function polkadot() {
  //   try {
  //     // Create mnemonic string for Alice using BIP39
  //     const mnemonicAlice = mnemonicGenerate();

  //     console.log(`Generated mnemonic: ${mnemonicAlice}`);

  //     // Validate the mnemonic string that was generated
  //     const isValidMnemonic = mnemonicValidate(mnemonicAlice);

  //     console.log(`isValidMnemonic: ${isValidMnemonic}`);

  //     // Create valid Substrate-compatible seed from mnemonic
  //     const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

  //     console.log(seedAlice);

  //     // Generate new public/secret keypair for Alice from the supplied seed
  //     const { publicKey, secretKey } = ed25519PairFromSecret(seedAlice);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  async function onAddressCopy() {
    await Clipboard.setStringAsync(address);
    Popup.message('Copied to clipboard');
  }

  async function onPublickeyCopy() {
    await Clipboard.setStringAsync(publicKey);
    Popup.message('Copied to clipboard');
  }

  return (
    <View style={styles.container}>
      <Identicon
        value={user.address}
        size={100}
      />
      <View style={styles.values}>
        <Text style={styles.label}>Your public address</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{address}</Text>
          <TouchableOpacity style={styles.copyBtn} onPress={onAddressCopy}>
            <MaterialCommunityIcons name="content-copy" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.label}>Your public key</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{publicKey}</Text>
          <TouchableOpacity style={styles.copyBtn} onPress={onPublickeyCopy}>
            <MaterialCommunityIcons name="content-copy" size={24} color="white" />
          </TouchableOpacity>
        </View> */}
      </View>
      <TouchableOpacity style={styles.signoutBtn}>
        <Text style={styles.signoutLabel}>Destroy session</Text>
      </TouchableOpacity>
    </View>
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
  values: {
    marginTop: 40,
    marginBottom: 80,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    color: colors.white,
  },
  valueRow: {
    marginTop: 10,
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    width: Dimensions.get('window').width - 140,
    color: colors.white,
  },
  copyBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signoutBtn: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  signoutLabel: {
    color: colors.black,
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
});

export default Settings;
