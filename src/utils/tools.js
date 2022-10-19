import { Keyring } from '@polkadot/keyring';
import { decodeAddress } from '@polkadot/util-crypto';
import {
  u8aToHex,
} from '@polkadot/util';

function keypairFromSeed(seed) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

function getPubKeyFromAddress(addr) {
  // const addr =
  const publicKey = decodeAddress(addr);
  const hexPublicKey = u8aToHex(publicKey);
  return hexPublicKey;
}

function encryptMessage({ senderPair, message, recipientPubKey }) {
  return u8aToHex(senderPair.encryptMessage(message, recipientPubKey));
}

function decryptMessage({ recipientPair, encrypted }) {
  return recipientPair.decryptMessage(encrypted);
}

const tools = {
  keypairFromSeed, getPubKeyFromAddress, encryptMessage, decryptMessage,
};

export default tools;
export {
  keypairFromSeed, getPubKeyFromAddress, encryptMessage, decryptMessage,
};
