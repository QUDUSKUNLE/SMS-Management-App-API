[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

# SMS-Management-App-API

SMS management application API is a simple app to manage short message service where Users can send and receive messages

## Getting Started

Clone the repository

```
$ git clone git@github.com:QUDUSKUNLE/SMS-Management-App-API.git
```

Install packages

```
$ npm install
```

Change `.env.sample` to `.env` and add the needed values

Start application

```
$ npm run debug
```

### Endpoints

| Endpoint                     | HTTP Method | Description                                |
| ---------------------------- | ----------- | ------------------------------------------ |
| /api/v1/contacts             | POST        | Returns payload a contact is created       |
| /api/v1/sms                  | POST        | Returns messages that sms is sent          |
| /api/v1/sms?sender=messageId | GET         | Get a message sender by messageId          |
| /api/v1/sms?receiver=messageId | GET       | Get a message received by messageId        |
| /api/v1/contacts?contact=phoneNumber  | GET       | Search for a contact by contact phoneNumber |
| /api/v1/contacts             | GET         | Query for all contacts by contacts         |
| /api/v1/contacts/:phoneNumber | DELETE      | Delete a specific contacts                |
| /api/v1/sms/:messageId/contacts/:contactId  | DELETE       | Delete a message |

### Documentation

Visit [API DOC](https://web.postman.co/collections/1515024-01a58e27-c509-4009-8033-baf1e6629ce5?workspace=1cebf9f6-06c8-4420-81c9-b5843b20c305) for API documentation

### Prerequisites

This application was built with Node js so you'll need the following to get it up and running

- [MongoDB](https://mongoosejs.com/)
- [Express](https://expressjs.com)
- [Node Js](https://nodejs.org/en/download/)


## Product Limitation

- There is currently no authentication
- No protected routes
- You cannot bulk delete messages or user
- This is just the API no frontend consuming it yet

## Want to Contribute?

- Fork the repository
- Make your contributions
- Ensure your codes follow the [AirBnB Javascript Styles Guide](http://airbnb.io/javascript/)
- Create Pull request against the develop branch.

## Author

- [Qudus Yekeen](https://github.com/QUDUSKUNLE)
