const Ajv = require('ajv');
const ajv = new Ajv(); // Initialize AJV

// orderSchema.js
const orderSchema = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['pending', 'completed', 'expired'],
        default: 'pending',
      },
      staffId: {
        type: 'integer',
        minimum: 1,  // Ensure valid staff ID
      },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            itemId: { type: 'integer' },
            quantity: { type: 'integer', minimum: 1 },
          },
          required: ['itemId', 'quantity'],
          additionalProperties: false,
        },
      },
    },
    required: ['items'],
    additionalProperties: false,
  };
  
  const orderValidator = ajv.compile(orderSchema);

  module.exports = orderValidator;
