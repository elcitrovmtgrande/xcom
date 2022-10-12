import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  ed25519PairFromSecret,
  decodeAddress,
  encodeAddress,
} from '@polkadot/util-crypto';

import { Keyring } from '@polkadot/keyring';

import {
  stringToU8a, u8aToHex, u8aToString, isHex, hexToU8a,
} from '@polkadot/util';

const isValidPolkadotAddress = (address) => {
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
};

const tools = {
  isValidPolkadotAddress,
};

export default tools;
export { isValidPolkadotAddress };
