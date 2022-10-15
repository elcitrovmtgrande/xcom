import { uniq } from 'lodash';

const formatter = {
  inbox(rawInbox, userAddress) {
    const inbox = [];
    // Getting all recipients and removing when I am the sender
    const sendersThatArentUser = rawInbox
      .map((m) => m.sender)
      .filter((sender) => sender !== userAddress);

    // Removing doublons
    const senders = uniq(sendersThatArentUser);

    // Picking the most recent message where sender is sender or recipient
    senders.forEach((s) => {
      const conversation = {
        with: s,
        last: rawInbox.find((message) => message.sender === s || message.recipient === s),
      };

      // Add in formatted inbox
      inbox.unshift(conversation);
    });

    return inbox;
  },
};

export default formatter;
