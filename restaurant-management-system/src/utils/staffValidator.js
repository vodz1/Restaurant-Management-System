const AJV = require('ajv');  // Import AJV

const ajv = new AJV();  // Create an AJV instance

// Define your validation schema
const staffSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const staffValidator = ajv.compile(staffSchema);
module.exports = staffValidator