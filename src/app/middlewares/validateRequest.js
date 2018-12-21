
/**
 * validate - description
 * @param {object} request the form data to be validated
 * @return {object} {} containing error and isValid
 */
const validateRequestBody = (request) => {
  if (Object.hasOwnProperty.call(request, 'body')) {
    for (const key in request.body) {
      switch (key) {
        case 'name':
          request.check('name', 'Name field cannot be empty')
            .trim()
            .notEmpty()
            .matches(/\w/);
          request.check('name', 'name must be more than 2 characters')
            .trim()
            .isLength(2, 50);
          break;

        case 'phoneNumber':
          request.check('phoneNumber', 'PhoneNumber field cannot be empty')
            .trim()
            .notEmpty();

          request.check('phoneNumber', 'PhoneNumber is incorrect')
            .trim()
            .isLength(11);
          break;

        case 'message':
          request.check('message', 'Message field cannot be empty')
            .trim()
            .notEmpty();
          request.check(
            'message',
            'Message length must not more than 150 characters'
          )
            .trim()
            .isLength(2, 150);
          break;

        case 'newPassword':
          request.check('newPassword', 'newPassword field cannot be empty')
            .trim()
            .notEmpty();
          request.check(
            'newPassword',
            'newPassword length must be more than 6 characters'
          )
            .trim()
            .isLength({ min: 7 }).matches(/\w/);
          break;

        default:
      }
    }
  }
  return request.validationErrors();
};

/**
 * @description This validates all request inputs
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @function  validateRequest
 * @return {object} return object containing validation error message
 */
const validateRequest = (req, res, next) => {
  const errors = validateRequestBody(req);
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ error: message, success: false });
  } else {
    next();
  }
};

export default validateRequest;
