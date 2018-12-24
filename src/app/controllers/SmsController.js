import dotenv from 'dotenv';

import Contacts from '../models/Contacts.js';
import Sms from '../models/Sms.js';
import normalize from '../helpers';
import pagination from '../utils/pagination';

dotenv.config();

/**
 * @ SmsController
 */
export default {
  /**
   * contacts create a new contact
   * Routes: POST: /api/v1/contacts
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void} json server response
   */
  async contacts(req, res) {
    if ((!req.body.name) || (!req.body.phoneNumber)) {
      return res.status(400).json({
        error: 'Either name or phoneNumber must not be empty',
        success: false,
      });
    }
    let phoneNumber;
    try {
      phoneNumber = await Contacts.findOne({ phoneNumber: req.body.phoneNumber });
      if (phoneNumber) {
        return res.status(409).json({
          error: 'PhoneNumber is already registered',
          success: false,
        });
      }
      const contact = new Contacts({
        name: normalize.text(req.body.name),
        phoneNumber: req.body.phoneNumber,
      });
      contact.save((error, newContact) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error,
          });
        }
        return res.status(201).json({
          message: 'Contact saved successful',
          success: true,
        });
      });
    } catch (e) { return res.status(500).json({ error: e }); }
  },

  /**
   * Routes: POST: /api/v1/sms
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void} json server response
   */
  async sendSMS(req, res) {
    if ((!req.body.message) || (!req.body.sender) || (!req.body.receiver)) {
      return res.status(400).json({
        error: 'Message or sender or receiver must not be empty',
        success: false,
      });
    }
    let senderPhoneNumber, receiverPhoneNumber;
    try {
      senderPhoneNumber = await Contacts.findOne({ phoneNumber: req.body.sender });
      receiverPhoneNumber = await Contacts.findOne({ phoneNumber: req.body.receiver });
      
      if (!senderPhoneNumber) {
        return res.status(400).json({
          error: 'Invalid sender phoneNumber',
          success: false,
        })
      }

      if (!receiverPhoneNumber) {
        return res.status(400).json({
          error: 'Invalid receiver phoneNumber',
          success: false,
        })
      }
      const newSMS = new Sms({
        message: normalize.text(req.body.message),
        sender: {
          id: senderPhoneNumber._id,
          phoneNumber: req.body.sender,
          name: senderPhoneNumber.name
        },
        receiver: { 
          id: receiverPhoneNumber._id,
          phoneNumber: req.body.receiver,
          name: receiverPhoneNumber.name
        }
      });
      newSMS.save((error, newMessage) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error,
          });
        }
        return res.status(200).json({
          _id: newMessage._id,
          message: 'Message sent successful',
          success: true
        });
      });
    } catch (e) { return res.status(500).json({ error: e }) }
  },

  /**
   * Routes: GET: /api/v1/sms?sender=messageId or ?receiver=messageId
   * @param {any} req user request object
   * @param {any} res server response
   * @returns {response} response object
   */
  async sendersAndreceiver(req, res) {
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    if (req.query.sender) {
      let sms;
      try {
        sms = await Sms.findOne({ _id: req.query.sender.trim() });
        debugger;
        return res.status(200).json({
          response: {
            _id: sms._id,
            sender: sms.sender.name,
            message: sms.message,
            success: true
          }
        });
      } catch (e) {
        return res.status(404).json({
          error: e,
          message: 'Invalid message id',
          success: false
        });
      }
    } else if (req.query.receiver) {
      let sms;
      try {
        sms = await Sms.findOne({ _id: req.query.receiver.trim() });
        debugger;
        return res.status(200).json({
          response: {
            receiver: sms.receiver.name,
            message: sms.message,
            success: true
          }
        });
      } catch (e) {
        return res.status(404).json({
          error: e,
          message: 'Invalid message id',
          success: false
        });
      }
    }
    let count;
    Sms.estimatedDocumentCount({}, (err, isCount) => {
      count = isCount;
      Sms.find({})
        .skip(offset)
        .limit(limit)
        .exec()
        .then(sms => res.status(200).json({
          sms,
          pageInfo: pagination(count, limit, offset)
        }));
    });
  },

  /**
   * Routes: GET: /api/v1/contacts?contact=phoneNumber
   * @description This search for message sender or receiver by messageId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf SmsController
   */
  async getContacts(req, res) {
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    if (req.query.contact) {
      let contact;
      try {
        contact = await Contacts.findOne({ phoneNumber: req.query.contact.trim() });
        return res.status(200).json({
          response: {
            _id: contact._id,
            name: contact.name,
            success: true
          }
        });
      } catch (e) {
        return res.status(404).json({
          error: e,
          message: 'Invalid message phoneNumber',
          success: false
        });
      }
    }
    let count;
    Contacts.estimatedDocumentCount({}, (err, isCount) => {
      count = isCount;
      Contacts.find({})
        .skip(offset)
        .limit(limit)
        .exec()
        .then(contact => res.status(200).json({
          contact,
          pageInfo: pagination(count, limit, offset)
        }));
    });
  },

  /**
   * Routes: DELETE: /api/v1/contacts/:phoneNumber
   * @description This deletes user`s account
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf SmsController
   */
  async deleteContact(req, res) {
    if (req.params.phoneNumber === undefined) {
      return res.status(401).json({
        success: false,
        error: 'User`s not authorized to perform this operation'
      });
    }
    let contact;
    try {
      contact = await Contacts.findOne({ phoneNumber: req.params.phoneNumber.trim() });
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact does not exist',
        })
      }
      Contacts.remove({ _id: contact._id })
        .then(() => res.status(202).send({
          success: true,
          message: 'Contact deleted successfully'
        }));
    } catch (e) { return res.status(500).json({ error: e }); }
  },

  /**
   * Routes: DELETE: /api/v1/sms/:messageId/contacts/:contactId
   * @description This deletes message created by a user
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf SmsController
   */
  async deleteMessage(req, res) {
    if (
      (req.params.messageId === undefined) ||
      (req.params.contactId === undefined)) {
      return res.status(401).json({
        success: false,
        error: 'User`s not authorized to perform this operation'
      });
    }
    let message;
    try {
      message = await Sms.find({}).where(
        { _id: req.params.messageId.trim(),
          'sender.id': req.params.contactId.trim() });
        if (!message) {
          return res.status(404).json({
            message: 'Message does not exist',
            success: false,
          })
        }
        Sms.remove({ _id: req.params.messageId.trim() })
          .then(() => res.status(202).send({
            success: true,
            message: 'Message deleted successfully'
          }));
    } catch (e) { return res.status(500).json({ error: e }); }
  }
};
