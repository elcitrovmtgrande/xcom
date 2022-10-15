// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import moment from 'moment';
import { u8aToHex } from '@polkadot/util';
import generateContacts from './contacts';
import { keypairFromSeed } from '../utils/tools';
import db from '../db';

/**
 * Generates messages for a given address
 * @param {String} userSeed The seed of the guy you wanna generate messages for
 * @param {Number} length Number of messages you wanna generate
 * @returns
 */
function generateMessages(userSeed, length) {
  const userPair = keypairFromSeed(userSeed);
  // Generation de contacts
  const contacts = generateContacts(2);
  const messages = [];
  // Generation des messages
  // Sauvegarde en DB (opt)

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const contact = sample(contacts);
    const content = faker.lorem.sentences(2);

    const message = {
      id: faker.datatype.uuid(),
      from: isSender() ? userPair.address : contact.address,
      to: isSender() ? contact.address : userPair.address,
      decoded: content,
      encoded: u8aToHex(userPair.encryptMessage(message, contact.contactPublicKey)),
      sentAt: faker.date.past().toJSON(),
      receivedAt: moment().toJSON(),
      readAt: faker.date.future().toJSON(),
    };

    messages.push(message);
  }

  // TODO : Faire la methode de sauvegarde dans la db + Sauvegarder les messages
  // + Recuperer les messages du user de puis la DB sur la session de welcome
  // |
  // v
  // contacts.forEach((c) => db.saveContact(c));
  // messages.forEach((m) => db.saveMessage(m));

  return messages;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isSender() {
  return getRandomInt(100) % 2 === 0;
}

export default generateMessages;
