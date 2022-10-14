const MessageSchema = {
  name: 'Message',
  properties: {
    from: 'string', // sender address
    to: 'string', // receiver address
    encryptedContent: 'string', // encrypted content string
    decryptedContent: 'string', // decrypted content string
    createdAt: 'string', // JSON date
    successfulSent: 'bool', // default false
    delivered: 'bool', // default false
  },
};

export default MessageSchema;
