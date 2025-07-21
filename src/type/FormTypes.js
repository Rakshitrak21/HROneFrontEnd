// Field types available in the form builder
export const FIELD_TYPES = ['string', 'number', 'boolean', 'nested', 'objectId', 'float'];

// Default field structure
export const createDefaultField = () => ({
  id: Date.now().toString(),
  name: '',
  type: 'string',
  required: false,
  children: []
});