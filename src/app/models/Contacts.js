import mongoose from 'mongoose';

/**
 * @description This is Contacts schema
 */
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Contacts = mongoose.model('Contacts', contactSchema);

export default Contacts;
