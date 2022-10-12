import { Keyring } from '@polkadot/keyring';
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  ed25519PairFromSecret,
  decodeAddress,
  encodeAddress,
} from '@polkadot/util-crypto';

import {
  stringToU8a, u8aToHex, u8aToString, isHex, hexToU8a,
} from '@polkadot/util';

function isValidPolkadotAddress(address) {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address),
    );

    return true;
  } catch (error) {
    return false;
  }
}

function keypairFromSeed(seed) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

const tools = {
  isValidPolkadotAddress,
  keypairFromSeed,
};

export default tools;
export { isValidPolkadotAddress, keypairFromSeed };
