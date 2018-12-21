import mongoose from 'mongoose';

/**
 * @description This is SMS model
 */
const smsSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contacts'
    },
    phoneNumber: { type: String },
    name: { type: String }
  },
  receiver: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contacts'
    },
    phoneNumber: { type: String },
    name: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Sms = mongoose.model('Sms', smsSchema);

export default Sms;
