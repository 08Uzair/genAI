import Message from "../models/Message.js";

export const saveMessageToDB = async (senderId, recipientId, content) => {
  if (!senderId || !recipientId || !content) {
    throw new Error('senderId, recipientId, and content are required.');
  }

  const messageId = `${senderId}_SR_${recipientId}`;
  const message = new Message({ senderId, recipientId, messageId, content });

  return await message.save();
};


const getMessagesByMessageId = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({ message: 'messageId is required.' });
    }

    // Split correctly
    const [id1, id2] = messageId.split('_SR_');

    if (!id1 || !id2) {
      return res.status(400).json({ message: 'Invalid messageId format. Expected senderId_SR_recipientId.' });
    }

    const messageId1 = `${id1}_SR_${id2}`;
    const messageId2 = `${id2}_SR_${id1}`;

    const messages = await Message.find({
      messageId: { $in: [messageId1, messageId2] }
    }).sort({ createdAt: 1 });

    if (!messages.length) {
      return res.status(200).json({
        message: 'Messages retrieved successfully.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Messages retrieved successfully.',
      data: messages,
    });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return res.status(500).json({
      message: 'An error occurred while fetching messages.',
      error: error.message,
    });
  }
};


export default { getMessagesByMessageId };