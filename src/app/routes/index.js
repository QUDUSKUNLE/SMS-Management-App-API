
import 'babel-polyfill';
import express from 'express';
import SmsController from '../controllers/SmsController';
import validateRequest from '../middlewares/validateRequest';


/**
 * Creates express Router
 */
const route = express.Router();

/**
 * Route for creating a new contact
 */
route.post(
  '/contacts',
  validateRequest,
  SmsController.contacts,
);

/**
 * Send SMS to a number
 */
route.post(
  '/sms',
  validateRequest,
  SmsController.sendSMS,
);

/**
 * Route to get an sms sender
 */
route.get(
  '/sms',
  SmsController.sendersAndreceiver
);


/**
 * Route to get a contact
 */
route.get(
  '/contacts',
  SmsController.getContacts
);


/**
 * Route to get developers and search for developers
 */
route.delete(
  '/contacts/:phoneNumber',
  SmsController.deleteContact
);

/**
 * Route to get developers and search for developers
 */
route.delete(
  '/sms/:messageId/contacts/:contactId',
  SmsController.deleteMessage
);


export default route;
