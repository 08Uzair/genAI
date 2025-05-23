import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        default: 'customer',
    },
    //link this to conversation model
    conversations: {
        type: [String], 
        default: [],                   
        required: false,              
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
