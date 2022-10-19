import { Keyring } from '@polkadot/keyring';
import { decodeAddress, cryptoWaitReady } from '@polkadot/util-crypto';
import {
  u8aToHex,
} from '@polkadot/util';

async function keypairFromSeed(seed) {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

function getPubKeyFromAddress(addr) {
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
