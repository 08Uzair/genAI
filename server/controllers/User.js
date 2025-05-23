import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModal from '../models/User.js';

const secret = 'test';

// SIGN IN
const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    try {
        const existingUser = await UserModal.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "7d" });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// SIGN UP
const signup = async (req, res) => {
    const { username, email, password, imageUrl, role } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(imageUrl)
    console.log(role)
    try {
        const existingUser = await UserModal.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModal.create({
            username,
            email,
            password: hashedPassword,
            imageUrl,
            role,
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// GET USER BY ID
const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

const getUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await UserModal.find({ role });

        if (users.length === 0) {
            return res.status(404).json({ message: `No users found with role '${role}'` });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        res.status(500).json({ message: 'Failed to fetch users by role', error: error.message });
    }
};


const createConversation = async (req, res) => {
    const { senderId, recipientId } = req.body;

    if (!senderId || !recipientId) {
        return res.status(400).json({ message: 'Sender ID and Recipient ID are required' });
    }

    try {
        const sender = await UserModal.findById(senderId);
        const recipient = await UserModal.findById(recipientId);

        if (!sender || !recipient) {
            return res.status(404).json({ message: 'Sender or recipient not found' });
        }

        // Update sender's conversations
        if (!sender.conversations.includes(recipientId)) {
            sender.conversations.push(recipientId);
            await sender.save();
        }

        // Update recipient's conversations
        if (!recipient.conversations.includes(senderId)) {
            recipient.conversations.push(senderId);
            await recipient.save();
        }

        res.status(200).json({
            message: 'Conversation created successfully',
            senderConversations: sender.conversations,
            recipientConversations: recipient.conversations,
        });
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default { signin, signup, getAllUsers, getUserById, getUsersByRole ,createConversation};
