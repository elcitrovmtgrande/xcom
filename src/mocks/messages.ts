// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import sample from 'lodash/sample';
import moment from 'moment';
import { u8aToHex } from '@polkadot/util';
import generateContacts from './contacts';
import { keypairFromSeed } from '../utils/tools';
import db from '../db';
import { Message } from '../types';

async function generateMessages(userSeed: string, length: number) {
  const userPair = await keypairFromSeed(userSeed);
  // Generation de contacts
  const contacts = generateContacts(2);
  const messages: Array<Message> = [];
  // Generation des messages
  // Sauvegarde en DB (opt)

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const contact = sample(contacts);
    const content = faker.lorem.sentences(2);
    const bIsSender = isSender();

    const message: Message = {
      identifier: faker.datatype.uuid(),
      sender: bIsSender ? userPair.address : contact.address,
      recipient: bIsSender ? contact.address : userPair.address,
      decoded: content,
      encoded: u8aToHex(userPair.encryptMessage(content, contact.contactPublicKey)),
      writtenAt: faker.date.past().toJSON(),
      sentAt: faker.date.past().toJSON(),
      deliveredAt: moment().toJSON(),
      readAt: faker.date.future().toJSON(),
    };

    messages.push(message);
  }

  // TODO : Faire la methode de sauvegarde dans la db + Sauvegarder les messages
  // + Recuperer les messages du user de puis la DB sur la session de welcome
  // |
  // v
  contacts.forEach((c) => db.saveContact(c));
  messages.forEach((m) => db.saveMessage(m));

  return messages;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function isSender() {
  return getRandomInt(100) % 2 === 0;
}

export default generateMessages;
