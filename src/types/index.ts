
type Message = {
  identifier: String,
  sender: String,
  recipient: String,
  decoded: String,
  encoded: String,
  writtenAt: String | null,
  sentAt: String | null,
  deliveredAt: String | null,
  readAt: String | null,
}

type Contact = {
  nickname: string,
  address: string,
};

type Conversation = {
  with: string,
  last: string,
}

type UserState = {
  seed: string,
  address: string,
  publicKey: string,
  contacts: Array<Contact>,
  inbox: Array<Message>,
}


export { Message, Contact, Conversation, UserState };
