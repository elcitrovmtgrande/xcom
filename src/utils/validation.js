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

const v = {
  user: {
    nickname(nickname) {
      return typeof nickname === 'string' && nickname.length >= 2;
    },
    address(address) {
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
    },
  },
};

export default v;
