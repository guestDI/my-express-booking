const { checkSchema, validationResult } = require('express-validator')

const createRegistrationUserSchema = checkSchema({
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Invalid email format',
    },
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be at least 8 characters long',
      options: { min: 8 },
    },
  },
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name should be a string',
    },
    isLength: {
      errorMessage: 'Name should be between 2 and 50 characters long',
      options: { min: 2, max: 50 },
    },
  },
})

const createLoginUserSchema = checkSchema({
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Invalid email format',
    },
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be at least 8 characters long',
      options: { min: 8 },
    },
  },
});

const createRoomSchema = checkSchema({
    name: {
      in: ['body'],
      isString: {
        errorMessage: 'Room name should be a string',
      },
      isLength: {
        errorMessage: 'Room name should be between 2 and 100 characters long',
        options: { min: 2, max: 100 },
      },
    },
    capacity: {
      in: ['body'],
      isInt: {
        errorMessage: 'Capacity should be an integer',
        options: { min: 1 },
      },
      toInt: true,
    },
    price_per_night: {
      in: ['body'],
      isFloat: {
        errorMessage: 'Price should be a valid number',
        options: { min: 0 },
      },
      toFloat: true,
    },
    description: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'Description should be a string',
      },
      isLength: {
        errorMessage: 'Description should be between 10 and 500 characters long',
        options: { min: 10, max: 500 },
      },
    },
  });

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let error = {}
    errors.array().map((err) => (error[err.param] = err.msg))
    return res.status(422).json({ error })
  }
  next()
}

module.exports = {
  createLoginUserSchema,
  createRegistrationUserSchema,
  validate,
  createRoomSchema
}
