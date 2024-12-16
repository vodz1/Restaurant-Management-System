

const Ajv = require('ajv');
const ajv = new Ajv(); // Initialize AJV

const itemSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0.1 },
      category: { type: 'string', minLength: 1 },
      adminId: { type: 'integer' },
    },
    required: ['name', 'description', 'price', 'category'],
    additionalProperties: false,
};
 const itemValidator = ajv.compile(itemSchema);
 module.exports = itemValidator;