
type Message = {
  identifier: string,
  sender: string,
  recipient: string,
  decoded: string,
  encoded: string,
  writtenAt: string | null,
  sentAt: string | null,
  deliveredAt: string | null,
  readAt: string | null,
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
  contacts: Contact[],
  inbox: Message[],
}


export { Message, Contact, Conversation, UserState };
