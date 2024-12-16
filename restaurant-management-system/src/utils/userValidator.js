const AJV = require('ajv');  // Import AJV

const ajv = new AJV();  // Create an AJV instance

// Define your validation schema
const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const userValidator = ajv.compile(userSchema);  
module.exports = userValidator