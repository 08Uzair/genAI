import Message from "../models/Message.js";
import User from "../models/User.js";

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



const getLastMessageDetails = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({ message: 'messageId is required.' });
    }

    const [id1, id2] = messageId.split('_SR_');
    if (!id1 || !id2) {
      return res.status(400).json({ message: 'Invalid messageId format. Expected senderId_SR_recipientId.' });
    }

    const messageId1 = `${id1}_SR_${id2}`;
    const messageId2 = `${id2}_SR_${id1}`;

    // Find the last message and populate sender's info
    const lastMessage = await Message.findOne({
      messageId: { $in: [messageId1, messageId2] }
    }).sort({ createdAt: -1 }).populate('senderId', 'username email imageUrl');
    // Get recipient info (assuming id2 is the recipientId)
    const recipientUser = await User.findById(id2).select('username imageUrl');


    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found.' });
    }

    if (!lastMessage) {
      return res.status(200).json({
        message: 'Last message retrieved successfully.',
        data: {
          lastMessageTime: "",
          lastMessage: "",
          lastMessageBy: {
            id: "",
            username: "",
          },
          chatWith: {
            id: id2,
            username: recipientUser.username,
            imageUrl: recipientUser.imageUrl

          },
        },
      });
    }


    const { createdAt, content, senderId } = lastMessage;

    return res.status(200).json({
      message: 'Last message retrieved successfully.',
      data: {
        lastMessageTime: createdAt,
        lastMessage: content,
        lastMessageBy: {
          id: senderId._id,
          username: senderId.username,
        },
        chatWith: {
          id: id2,
          username: recipientUser.username,
          imageUrl: recipientUser.imageUrl
        },
      },
    });
  } catch (error) {
    console.error('Error retrieving last message:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving the last message.',
      error: error.message,
    });
  }
};



export default { getMessagesByMessageId, getLastMessageDetails };