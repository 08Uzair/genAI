import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const summarySchema = new Schema(
  {
   
    messageId: {
      type: String,
      required: true, 
    },
    summary: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);

const Summary = model('Summary', summarySchema);
export default Summary;
