import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const suggestionSchema = new Schema(
  {
   
    messageId: {
      type: String,
      required: true, 
    },
    suggestion: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);

const Suggestion = model('Suggestion', suggestionSchema);
export default Suggestion;
